import { Component, OnInit } from '@angular/core';
import { Appointment, ClerkService } from '../clerk.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-confirmorder',
  templateUrl: './confirmorder.component.html',
  styleUrls: ['./confirmorder.component.scss']
})
export class ConfirmorderComponent implements OnInit {

  clientEmail: string = "";
  appointmentId: string = "";
  appointment: Appointment = <Appointment>{
    dateAdded: new Date
  }; //this variable is used to store the document data
  time = { hour: 13, minute: 30 };

  confirmOrderForm = new FormGroup({
    dateFortheAppointment: new FormControl('', Validators.required),
    timeFortheAppointment: new FormControl('', Validators.required),
  });
  constructor(private route: ActivatedRoute, private clerkService: ClerkService, private router: Router) {

    this.appointmentId = this.route.snapshot.paramMap.get('id');

    console.log('this is the id ' + this.appointmentId);

    this.clerkService.getAppointmentData(this.appointmentId).subscribe(res => {
      console.log(res);
      this.appointment = res;
      this.clientEmail = this.appointment.email;








    })



  }

  confirm() {
    console.log(this.confirmOrderForm.value);
  }
  ngOnInit(): void {
  }

}
