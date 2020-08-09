import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore/';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Router } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { firestore } from 'firebase';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private appointmentCollection: AngularFirestoreCollection<Appointment>;
  appointments: Observable<AppointmentId[]>;
  estimateDetails;
  dateTodayString;
  monthInIntegerValue;
  stringCountFieldVal: string;
  email: string = "";
  downloadURL: Observable<string | null>;

  constructor(
    private afs: AngularFirestore, private toastrService: NbToastrService, private router: Router, private afstorage: AngularFireStorage, private datePipe: DatePipe
  ) {
    this.email = localStorage.getItem('email');
    this.dateTodayString = datePipe.transform(Date.now(), 'yyyyMM');
    this.monthInIntegerValue = datePipe.transform(Date.now(), 'MM');
    this.stringCountFieldVal = "count".concat(this.monthInIntegerValue);

  }

  showToast(status: NbComponentStatus, message: string) { //function used to show toast messages
    this.toastrService.show(status, message, { status });
  }

  getAppointments(): Observable<AppointmentId[]> {
    // return this.afs.collection('users').doc(this.email).collection("appointments").snapshotChanges();
    this.appointmentCollection = this.afs.collection('users').doc(this.email).collection<Appointment>('appointments');
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

  async addewAppointment(data, imageUp) {


    // let date: Date = val['dateAdded'];
    // let pipe = new DatePipe('en-US'); // Use your own locale

    // let formatDate = pipe.transform(date, 'MM-dd-y');

    if (imageUp == null) {
      await this.afs.collection('users').doc(this.email).collection('appointments').add(data).then(res => {
        this.afs.collection('appointments').doc(res.id).set(data).then(res => {

          let val = {
            'totalRequests': firestore.FieldValue.increment(1),

          }
          val[this.stringCountFieldVal] = firestore.FieldValue.increment(1),
            this.afs.collection("users").doc(this.email).collection('requests').doc(this.datePipe.transform(Date.now(), 'yyyy')).set(val, { merge: true }).catch(res => {
              console.log(res);
            }).then(res => {
              console.log("field value of month increased");
            });


          let val2 = {};
          if (data['checkTypes'].length >= 1) {
            val2['custom'] = firestore.FieldValue.increment(1);




          } else {
            val2['single'] = firestore.FieldValue.increment(1);
          }

          this.afs.collection("reports").doc("OrderTypes").set({}, { merge: true });
          this.afs.collection("reports").doc("OrderTypes").collection(this.datePipe.transform(Date.now(), 'yyyy')).doc("report").set(val2, { merge: true }).catch(res => {
            console.log(res);
          }).then(res => {
            console.log("field value of month increased");
          });

          window.location.reload();
        }).catch(res => {
          this.showToast('danger', res);

        });

      }).catch(res => {
        {



        }
        this.showToast('danger', res);

      });
    }
    else {

      const filePath = Math.floor(100000 + Math.random() * 900000).toString();
      const fileRef = this.afstorage.ref(filePath);
      const task = this.afstorage.upload(filePath, imageUp);

      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(res => {
            console.log(res);
            data['image'] = res;
            this.afs.collection('users').doc(this.email).collection('appointments').add(data).then(res => {
              this.afs.collection('appointments').doc(res.id).set(data).then(res => {
                let val = {
                  'totalRequests': firestore.FieldValue.increment(1),

                }
                val[this.stringCountFieldVal] = firestore.FieldValue.increment(1),
                  this.afs.collection("users").doc(this.email).collection('requests').doc(this.datePipe.transform(Date.now(), 'yyyy')).set(val, { merge: true }).catch(res => {
                    console.log(res);
                  }).then(res => {
                    console.log("field value of month increased");
                  });
                window.location.reload();
              }).catch(res => {
                this.showToast('danger', res);

              });

            }).catch(res => {
              this.showToast('danger', res);

            });
          });
        })
      )
        .subscribe()

    }
    // console.log(val);

  }

  getEstimateDetails(orderID: string) {
    return this.afs.collection('appointments').doc(orderID).collection('appointmentData').doc('estimate').valueChanges();
  }

  acceptEstimate(orderID: string, clientEmail: string, feedBack: string) {
    this.afs.collection('appointments').doc(orderID).update(
      {
        'status': 4,
        'customerFeedBack': feedBack
      }
    );
    this.afs.collection('users').doc(clientEmail).collection('appointments').doc(orderID).update(
      {
        'status': 4,
        'customerFeedBack': feedBack

      }
    ).then(res => {
      this.showToast('success', "Estimate accepted successfully");
      window.location.reload();

    });

    let val = {
      'total': firestore.FieldValue.increment(1),

    }
    val[this.stringCountFieldVal] = firestore.FieldValue.increment(1),


      this.afs.collection('reports').doc('AcceptedReport').set({}, { merge: true });
    this.afs.collection('reports').doc('AcceptedReport').collection(this.datePipe.transform(Date.now(), 'yyyy')).doc('report').set(val, { merge: true });

  }

  requestAnotherEstimate(orderID: string, clientEmail: string, feedBack: string) {
    this.afs.collection('appointments').doc(orderID).update(
      {
        'status': -3,
        'customerFeedBack': feedBack

      }
    );
    this.afs.collection('users').doc(clientEmail).collection('appointments').doc(orderID).update(
      {
        'status': -3,
        'customerFeedBack': feedBack

      }
    ).then(res => {
      this.showToast('success', " Another Estimate Requested Successfully");
      window.location.reload();

    });
  }

  rejectEstimate(orderID: string, clientEmail: string, feedBack: string) {
    this.afs.collection('appointments').doc(orderID).update(
      {
        'status': -4,
        'customerFeedBack': feedBack

      }
    );
    this.afs.collection('users').doc(clientEmail).collection('appointments').doc(orderID).update(
      {
        'status': -4,
        'customerFeedBack': feedBack

      }
    ).then(res => {
      this.showToast('success', " Another Estimate Requested Successfully");
      // window.location.reload();

    });

    this.afs.collection('reports').doc('RejectedReport').set({}, { merge: true });


    this.afs.collection('reports').doc('RejectedReport').collection(this.dateTodayString).add({
      'id': orderID,
      'email': clientEmail,
      'feedback': feedBack
    });

    let val = {
      'total': firestore.FieldValue.increment(1),

    }
    val[this.stringCountFieldVal] = firestore.FieldValue.increment(1),


      this.afs.collection('reports').doc('RejectedReport').collection(this.datePipe.transform(Date.now(), 'yyyy')).doc('report').set(val, { merge: true });
  }


  addFeedbackNotesforCurrentOrder(id: string, email: string, note: string) {
    this.afs.collection('appointments').doc(id).collection('appointmentData').doc('progress').update(
      {
        'userFeedback': firestore.FieldValue.arrayUnion(note)
      }
    );


    this.afs.collection('users').doc(email).collection('appointments').doc(id).collection('appointmentData').doc('progress').update(
      {
        'userFeedback': firestore.FieldValue.arrayUnion(note)

      }
    );

  }

  // getNoOfAppointmentsEachMonth(): Observable<DocumentSnapshot<unknown>> {
  //   return this.afs.collection("users").doc(this.email).collection("requests").doc(this.datePipe.transform(Date.now(), 'yyyy')).snapshotChanges();
  // }



  getCurrentAppointments(): Observable<AppointmentId[]> {
    // return this.afs.collection('users').doc(this.email).collection("appointments").snapshotChanges();
    this.appointmentCollection = this.afs.collection('users').doc(localStorage.getItem('email')).collection<Appointment>('appointments');
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




}

export interface Appointment {
  status: number;
  descriptionOfOrder: string;
  methodOfContact: number;
  date: string;
  dateAdded: Date;
  address: string;
  checkTypes: Array<string>;
  dateFortheAppointment: string;
  timeFortheAppointment: string
}

export interface AppointmentId extends Appointment {
  id: string;
}
