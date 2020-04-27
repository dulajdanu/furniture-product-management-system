import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private toastrService: NbToastrService) {

  }

  ngOnInit() {
  }
  signUpForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rePassword: new FormControl('', [Validators.required,]),
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

  // constructor(){
  //   super( NbAuthService,  {},  ChangeDetectorRef,  Router)
  // }



  registerUsr(val) {
    console.log(val);
    if (val['password'] === val['rePassword']) {
      this.authService.signUp(val['email'], val['password'], val['fullName'])

    }
    else {
      this.showToast('danger', 'Passwords doesnt match');

    }
  }

  showToast(status: NbComponentStatus, message: string) { //function used to show toast messages
    this.toastrService.show(status, message, { status });
  }




}
