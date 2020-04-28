import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { async } from '@angular/core/testing';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  email: string = "";
  constructor(
    private afs: AngularFirestore
  ) {
    this.email = localStorage.getItem('email');
  }

  getAppointments() {
    return this.afs.collection('users').doc(this.email).collection("appointments").snapshotChanges();
  }


}
