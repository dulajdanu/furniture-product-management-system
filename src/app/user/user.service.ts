import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore/';
import { async } from '@angular/core/testing';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private appointmentCollection: AngularFirestoreCollection<Appointment>;
  appointments: Observable<AppointmentId[]>;

  email: string = "";
  constructor(
    private afs: AngularFirestore, private toastrService: NbToastrService, private router: Router
  ) {
    this.email = localStorage.getItem('email');
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

  async addewAppointment(val) {
    console.log(val);
    await this.afs.collection('users').doc(this.email).collection('appointments').add(val).then(res => {
      this.showToast('success', 'New appointment added successfully');

    }).catch(res => {
      this.showToast('danger', res);

    });
  }


}

export interface Appointment {
  status: number;
  descriptionOfOrder: string;
  methodOfContact: number;
  date: string;
  dateAdded: Date;
  address: string;
  checkTypes: Array<string>
}

export interface AppointmentId extends Appointment {
  id: string;
}
