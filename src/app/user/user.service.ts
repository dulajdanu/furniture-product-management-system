import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/';
import { async } from '@angular/core/testing';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  email: string = "";
  constructor(
    private afs: AngularFirestore, private toastrService: NbToastrService, private router: Router
  ) {
    this.email = localStorage.getItem('email');
  }

  showToast(status: NbComponentStatus, message: string) { //function used to show toast messages
    this.toastrService.show(status, message, { status });
  }

  getAppointments() {
    return this.afs.collection('users').doc(this.email).collection("appointments").snapshotChanges();
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
