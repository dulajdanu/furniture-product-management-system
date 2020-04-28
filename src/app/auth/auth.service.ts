import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/';
import { AngularFirestore } from '@angular/fire/firestore/';
import { async } from '@angular/core/testing';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {




  constructor(private angularFireAuth: AngularFireAuth, private afs: AngularFirestore, private toastrService: NbToastrService, private router: Router) { }

  async  signUp(email: string, password: string, fullName: string, type: number) { //new user signup
    await this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log('new account created');
      this.showToast('success', 'New account created successfully');

      this.addNewUserData(email, fullName, type);

    }).catch(res => {
      console.log(res.toString());
      this.showToast('danger', res);

    })
  }

  async addNewUserData(email: string, fullName: string, type: number) { //adding new user data to the firestore databse


    if (type == 0) {
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
    else if (type === 1) {
      await this.afs.collection('managers').doc(email).set({
        email: email,
        fullName: fullName
      }).then(res => {
        console.log(res);
        console.log("new account data added");

      }).catch(res => {
        console.log(res.toString());

      });
    }
    else if (type == 2) {
      await this.afs.collection('clerks').doc(email).set({
        email: email,
        fullName: fullName
      }).then(res => {
        console.log(res);
        console.log("new account data added");

      }).catch(res => {
        console.log(res.toString());

      });
    }
  }

  async login(email: string, password: string, type: number) { //user login
    if (type == 0) //if the person select the type as a user
    {
      await this.afs.collection('users').doc(email.trim()).ref.get().then(val => {
        if (val.exists) {
          this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
            console.log(res.user.email);
            this.showToast('success', 'You have successfully logged in');
            localStorage.setItem('email', email);
            localStorage.setItem('type', "0");
            this.router.navigateByUrl('/user/home')

          }).catch(res => {
            this.showToast('danger', res);

          });
        }
        else {
          this.showToast('danger', 'you are not a user of the system');

        }
      }).catch(val => {
        this.showToast('danger', val);

      });
    }
    else if (type == 1) //if the person select the type as a manager
    {
      await this.afs.collection('managers').doc(email.trim()).ref.get().then(val => {
        if (val.exists) {
          this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
            console.log(res.user.email);
            this.showToast('success', 'You have successfully logged in');
            localStorage.setItem('email', email);
            localStorage.setItem('type', "1");
            this.router.navigateByUrl('/manager/home')

          }).catch(res => {
            this.showToast('danger', res);

          });
        }
        else {
          this.showToast('danger', 'you are not a Manager of the system');

        }
      }).catch(val => {
        this.showToast('danger', val);

      });
    }
    else if (type == 2) //if the person select the type as a clerk
    {
      await this.afs.collection('clerks').doc(email.trim()).ref.get().then(val => {
        if (val.exists) {
          this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
            console.log(res.user.email);
            this.showToast('success', 'You have successfully logged in');
            localStorage.setItem('email', email);
            localStorage.setItem('type', "2");
            this.router.navigateByUrl('/clerk/home');
          }).catch(res => {
            this.showToast('danger', res);

          });
        }
        else {
          this.showToast('danger', 'you are not a Clerk of the system');

        }
      }).catch(val => {
        this.showToast('danger', val);

      });
    }
  }

  async resetPassword(email: string) //this function is used to reset password
  {
    await this.angularFireAuth.sendPasswordResetEmail(email).then(res => {
      this.showToast('success', "You will receive a email to reset your password");
    }).catch(val => {
      console.log(val);
      this.showToast('danger', val);

    });
  }

  showToast(status: NbComponentStatus, message: string) { //function used to show toast messages
    this.toastrService.show(status, message, { status });
  }

  async SignOut() { //signout function
    this.angularFireAuth.signOut().then(res => {
      localStorage.clear();
      this.router.navigateByUrl('/auth/login');
    }).catch(res => {
      this.showToast('danger', res);

    });

    // window.location.reload();

    // window.location.reload();
  }


}
