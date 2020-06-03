import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore/';
import { async } from '@angular/core/testing';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Router } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
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
    private afs: AngularFirestore, private toastrService: NbToastrService, private router: Router
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

  sendEstimate(val, orderDetails, total) {
    console.log(val);
    console.log(orderDetails);
    this.afs.collection('appointments').doc(orderDetails['id']).update({
      'status': 3
    }).then(res => { }).catch(res => {
      this.showToast('danger', res);

    });

    val = { val };
    val.totalVal = total;

    this.afs.collection('users').doc(orderDetails['email']).collection('appointments').doc(orderDetails['id']).collection('appointmentData').doc('estimate').set(val).then(res => {
      // this.showToast('success', 'estimate sent successfully');

    }).catch(res => {
      this.showToast('danger', res);

    });
    this.afs.collection('users').doc(orderDetails['email']).collection('appointments').doc(orderDetails['id']).update({ 'status': 3 }).then(res => {
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
        'status': 2
      }
    );

    this.afs.collection('users').doc(email).collection('appointments').doc(id).update({
      'status': 2

    });
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




