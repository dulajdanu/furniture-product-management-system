import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authService: AuthService) { }

  forgetPassForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

  });

  get email() {
    return this.forgetPassForm.get('email');
  }

  ngOnInit(): void {
  }

  resetPass(val) {

    this.authService.resetPassword(val['email']);
  }

}
