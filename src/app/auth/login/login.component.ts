import { Component, OnInit } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.loginForm.get('email');
  }


  loginUsr(val) {
    console.log(val['email']);
  }

}

