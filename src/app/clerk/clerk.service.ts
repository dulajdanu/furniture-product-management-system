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
export class ClerkService {

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

  confirmAppointment(id: string, emailOftheClient: string) {
    console.log(id);
    console.log(emailOftheClient);
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
  phone: string
}

export interface AppointmentId extends Appointment {
  id: string;
}
