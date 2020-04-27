import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/';
import { AngularFirestore } from '@angular/fire/firestore/';
import { async } from '@angular/core/testing';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';


@Injectable({
  providedIn: 'root'
})
export class AuthService {




  constructor(private angularFireAuth: AngularFireAuth, private afs: AngularFirestore, private toastrService: NbToastrService) { }

  async  signUp(email: string, password: string, fullName: string) { //new user signup
    await this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log('new account created');
      this.showToast('success', 'New account created successfully');

      this.addNewUserData(email, fullName);

    }).catch(res => {
      console.log(res.toString());
      this.showToast('danger', res);

    })
  }

  async addNewUserData(email: string, fullName: string) { //adding new user data to the firestore databse
    await this.afs.collection('users').doc(email).set({
      email: email,
      fullName: fullName
    }).then(res => {
      console.log(res);
      console.log("new account data added");

    }).catch(res => {
      console.log(res.toString());

    });
  }

  async login(email: string, password: string) { //user login
    this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
      console.log(res.user.email);
      this.showToast('success', 'You have successfully logged in');
    }).catch(res => {
      console.log(res);
      this.showToast('danger', res);

    })
  }

  showToast(status: NbComponentStatus, message: string) { //function used to show toast messages
    this.toastrService.show(status, message, { status });
  }
}
