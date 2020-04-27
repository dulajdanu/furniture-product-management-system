import { Component, OnInit } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
  }

  constructor(private atuhService: AuthService) { }
  userTypes = [ //user types to show in the login page
    { value: 0, label: "User" },
    {
      value: 1, label: "Manager"
    },
    {
      value: 2, label: "Clerk"
    }
  ];

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    userType: new FormControl('', Validators.required)
  });

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.loginForm.get('email');
  }
  get userType() {
    return this.loginForm.get('userType');

  }


  loginUsr(val) {
    console.log(val['email']);
    this.atuhService.login(val['email'], val['password'], val['userType']);
  }

}

