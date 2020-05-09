import { Component, OnInit } from '@angular/core';
import { Appointment, ClerkService } from '../clerk.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
    email: new FormControl({ value: localStorage.getItem('clientMail'), disabled: true }, [Validators.required, Validators.email]),
    // phone: new FormControl({ value: "077639690", disabled: true }, Validators.required),
    dateFortheAppointment: new FormControl('', Validators.required),
    timeFortheAppointment: new FormControl('', Validators.required),
    remindTime: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),

  });

  ngOnDestroy() {
    localStorage.setItem('clientMail', null); //we have to remove the client email from the local storage after this component is destroyed

  }

  get dateFortheAppointment() {
    return this.confirmOrderForm.get('dateFortheAppointment');
  }

  get timeFortheAppointment() {
    return this.confirmOrderForm.get('timeFortheAppointment');
  }

  get remindTime() {
    return this.confirmOrderForm.get('remindTime');
  }

  get description() {
    return this.confirmOrderForm.get('description');
  }
  constructor(private route: ActivatedRoute, private clerkService: ClerkService, private router: Router) {

    this.appointmentId = this.route.snapshot.paramMap.get('id');

    console.log('this is the id ' + this.appointmentId);

    this.clerkService.getAppointmentData(this.appointmentId).subscribe(res => {
      console.log(res);
      this.appointment = res;
      this.clientEmail = this.appointment.email;








    })



  }

  onSubmit(val) {
    console.log(val);
    let date: Date = val['dateFortheAppointment'];
    let pipe = new DatePipe('en-US'); // Use your own locale

    let formatDate = pipe.transform(date, 'MM-dd-y');
    console.log(formatDate);
    val['dateFortheAppointment'] = formatDate;
    val['clientEmail'] = localStorage.getItem('clientMail');
    this.clerkService.confirmAppointment(this.appointmentId, val, formatDate, this.timeFortheAppointment.value);
  }
  ngOnInit(): void {
  }

}
