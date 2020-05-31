import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore/';

@Injectable({
  providedIn: 'root'
})
export class ClerkguardService implements CanActivate {

  constructor(private afs: AngularFirestore, private router: Router) { }

  canActivate(): boolean {
    const email = localStorage.getItem('email');
    let flag = 0; //this flag is used to check whether this user exist in the database
    try {
      this.afs.collection('clerks').doc(email).ref.get().then(val => {
        if (val.exists) {
          console.log('thre is a doc of the clerk');
          // return true;
          return true;

        }
        else {
          console.log('thre is no doc of the clerk');

          // return false;
          flag = 1;
          console.log(flag);
          this.router.navigate(['/auth'])
          return false;
        }
      }).catch(res => {
        console.log('in the catch block');
        console.log(res);
        // return false;
        flag = 1;
        this.router.navigate(['/auth'])
        return false;
      });
    } catch (error) {
      console.log('in the catch block external');
      flag = 1;
      this.router.navigate(['/auth'])
      return false;

    }
    if (flag == 0) {
      console.log('in if part of auth guard');

      return true;
    }
    else {
      console.log('in else part of auth guard');
      this.router.navigate(['/auth'])
      return false;
    }

  }
}
