import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/';
import { AngularFirestore } from '@angular/fire/firestore/';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth, private afs: AngularFirestore) { }

  async  signUp(email: string, password: string, fullName: string) {
    await this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log('new account created');
      this.addNewUserData(email, fullName);

    }).catch(res => {
      console.log(res.toString());
    })
  }

  async addNewUserData(email: string, fullName: string) {
    await this.afs.collection('users').doc(email).set({
      email: email,
      fullName: fullName
    }).then(res => {
      console.log("new account data added");
    }).catch(res => {
      console.log(res.toString());
    });
  }
}
