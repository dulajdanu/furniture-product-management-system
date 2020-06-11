import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore/';
import { async } from '@angular/core/testing';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Router } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { firestore } from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private appointmentCollection: AngularFirestoreCollection<Appointment>; //reference to the appointment document collection
  appointments: Observable<AppointmentId[]>;
  private appointmentDoc: AngularFirestoreDocument<Appointment>;
  appointment: Observable<Appointment>;
  email: string = "";
  constructor(
    private afs: AngularFirestore, private toastrService: NbToastrService, private router: Router, private afstorage: AngularFireStorage, private angularFireAuth: AngularFireAuth
  ) {
    this.email = localStorage.getItem('email'); //getiing the email of the clerk
  }

  showToast(status: NbComponentStatus, message: string) { //function used to show toast messages
    this.toastrService.show(status, message, { status });
  }

  getAppointments(): Observable<AppointmentId[]> {
    // return this.afs.collection('users').doc(this.email).collection("appointments").snapshotChanges();
    this.appointmentCollection = this.afs.collection<Appointment>('appointments');
    this.appointments = this.appointmentCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Appointment;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    // this.appointments.subscribe(res => {
    //   console.log(res);
    // });
    return this.appointments;
  }


  //this function is used to get details of a specific order 
  getAppointmentData(val: string) { //val is the id of the document
    this.appointmentDoc = this.afs.doc<Appointment>(`appointments/${val}`); //referencing to the document that we want to get
    this.appointment = this.appointmentDoc.valueChanges();
    return this.appointment;
  }

  cancelAppointment(id: string, emailOftheClient: string) {
    console.log(id);
    console.log(emailOftheClient);
    this.afs.collection('appointments').doc(id).update({
      'status': 3
    }).then(res => {
      this.afs.collection('users').doc(emailOftheClient).collection('appointments').doc(id).update({
        'status': 3
      }).then(res => {
        this.showToast('success', 'appointment cancelled successfully');

      }).catch(res => {
        this.showToast('danger', res);

      });
    }).catch(res => {
      this.showToast('danger', res);
    });
  }

  confirmAppointment(id: string, val) {
    console.log(id);
    console.log(val);
    this.afs.collection('users').doc(val).collection('appointments').doc(id).update(
      {
        'status': 2 //changing the appointment status to 2 means the manager is going to meet the client
      }
    ).then(res => {
      this.afs.collection('appointments').doc(id).update({
        'status': 2,//changing the appointment status to 2 means the manager is going to meet the client
        'manager': localStorage.getItem('email')
      }).then(res => {
        this.showToast('success', 'appointment confirmed successfully');

      }

      ).catch(res => {
        this.showToast('danger', res);

      }

      )

    }
    ).catch(res => {
      this.showToast('danger', res);

    });
  }

  startOrder(id, email) {
    this.afs.collection('appointments').doc(id).update({
      'status': 5
    });

    this.afs.collection('appointments').doc(id).collection('appointmentData').doc('progress').set(
      {
        'progress': 0
      }
    );

    this.afs.collection('users').doc(email).collection('appointments').doc(id).update({
      'status': 5
    });

    this.afs.collection('users').doc(email).collection('appointments').doc(id).collection('appointmentData').doc('progress').set(
      {
        'progress': 0
      }
    );
  }


  getAppointmentsofaClerk(): Observable<AppointmentId[]> {
    this.appointmentCollection = this.afs.collection("clerks").doc(localStorage.getItem('email')).collection<Appointment>('appointments');
    this.appointments = this.appointmentCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Appointment;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    // this.appointments.subscribe(res => {
    //   console.log(res);
    // });
    return this.appointments;
  }

  sendEstimate(val, orderDetails, total, labourCost, dateOfCompletion) {
    console.log(val);
    console.log(orderDetails);
    this.afs.collection('appointments').doc(orderDetails['id']).update({
      'status': 3,
      'labourCost': labourCost,
      'dateOfCompletion': dateOfCompletion
    }).then(res => { }).catch(res => {
      this.showToast('danger', res);

    });

    val = { val };
    val.totalVal = total;
    val.labourCost = labourCost;
    val.dateOfCompletion = dateOfCompletion;

    this.afs.collection('users').doc(orderDetails['email']).collection('appointments').doc(orderDetails['id']).collection('appointmentData').doc('estimate').set(val).then(res => {
      // this.showToast('success', 'estimate sent successfully');

    }).catch(res => {
      this.showToast('danger', res);

    });
    this.afs.collection('users').doc(orderDetails['email']).collection('appointments').doc(orderDetails['id']).update({
      'status': 3,
      'labourCost': labourCost,
      'dateOfCompletion': dateOfCompletion
    }).then(res => {
      // this.showToast('success', 'estimate sent successfully');

    }).catch(res => {
      this.showToast('danger', res);

    });


    this.afs.collection('appointments').doc(orderDetails['id']).collection('appointmentData').doc('estimate').set(val).then(res => {
      this.showToast('success', 'estimate sent successfully');

    }).catch(res => {
      this.showToast('danger', res);

    });

  }

  sendAnotherEstimate(id, email) {
    this.afs.collection('appointments').doc(id).update(
      {
        'status': 2,
      }
    );

    this.afs.collection('users').doc(email).collection('appointments').doc(id).update({
      'status': 2

    });
  }


  getProgressOfaOrder(id: string) {
    return this.afs.collection('appointments').doc(id).collection('appointmentData').doc('progress');
  }
  changeProgress(id: string, email: string, progress: number, note: string) {
    this.afs.collection('appointments').doc(id).collection('appointmentData').doc('progress').update(
      {
        'progress': firestore.FieldValue.increment(progress),
        'notes': firestore.FieldValue.arrayUnion(note)
      }
    );


    this.afs.collection('users').doc(email).collection('appointments').doc(id).collection('appointmentData').doc('progress').update(
      {
        'progress': firestore.FieldValue.increment(progress),
        'notes': firestore.FieldValue.arrayUnion(note)

      }
    );

  }

  addPhotosofProgress(id: string, email: string, files: Array<File>) {

    files.forEach(element => {
      const filePath = Math.floor(100000 + Math.random() * 900000).toString();
      const fileRef = this.afstorage.ref(filePath);
      const task = this.afstorage.upload(filePath, element);
      let downloadURL: Observable<string>;
      task.snapshotChanges().pipe(
        finalize(() => {
          downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(res => {
            this.afs.collection('appointments').doc(id).collection('appointmentData').doc('progress').update(
              {
                'images': firestore.FieldValue.arrayUnion(res)
              }
            );


            this.afs.collection('users').doc(email).collection('appointments').doc(id).collection('appointmentData').doc('progress').update(
              {
                'images': firestore.FieldValue.arrayUnion(res)

              }
            ).then(res => {
              this.showToast('success', 'photos added successfully');

            });

          })
        })

      ).subscribe()

    });



  }

  getInventoryUsageReports(date: string) {
    return this.afs.collection('reports').doc('InventoryReport').collection(date).valueChanges();
  }

  getRejectedReports(date: string) {
    return this.afs.collection('reports').doc('RejectedReport').collection(date).valueChanges();
  }

  createNewStaffAccount(email, fullname, password) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      this.afs.collection('clerks').doc(email).set(
        {
          email: email,
          fullName: fullname
        }
      ).then(res => {
        this.showToast('success', "New Staff Account created Successfully");
      }).catch(res => {
        this.showToast('danger', res);
      });
    }).catch(res => {
      this.showToast('danger', res);
    })
  }
}





export interface Appointment {
  status: number;
  descriptionOfOrder: string;
  methodOfContact: number;
  date: string;
  dateAdded: any;
  address: string;
  checkTypes: Array<string>;
  email: string;
  phone: string;
  confirmedBy: string;
  dateFortheAppointment: string;
  timeFortheAppointment: string
}

export interface AppointmentId extends Appointment {
  id: string;
}




