import { Component, OnInit } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends NbRegisterComponent {

  signUpForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', [Validators.required]),
    agreeToConditons: new FormControl(false, Validators.requiredTrue)
  });

  get fullName() {
    return this.signUpForm.get('fullName');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get rePassword() {
    return this.signUpForm.get('rePassword');
  }
  get agree() {
    return this.signUpForm.get('agreeToConditons');
  }



  registerUsr(val) {
    console.log(val);
  }




}
