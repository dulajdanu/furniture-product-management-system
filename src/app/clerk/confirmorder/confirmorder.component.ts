import { Component, OnInit } from '@angular/core';
import { Appointment, ClerkService } from '../clerk.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-confirmorder',
  templateUrl: './confirmorder.component.html',
  styleUrls: ['./confirmorder.component.scss']
})
export class ConfirmorderComponent implements OnInit {

  clientEmail: string = "";
  clerkMail;
  appointmentId: string = "";
  appointment: Appointment = <Appointment>{
    dateAdded: new Date
  }; //this variable is used to store the document data
  time = { hour: 13, minute: 30 };
  appointmentsOftheMAnagerCount: number = 0;
  pipe = new DatePipe('en-US'); // Use your own locale
  date = new Date();
  appointMentSubscription: Subscription;
  appointMentSubscription2: Subscription;


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
    this.appointMentSubscription.unsubscribe();
    this.appointMentSubscription2.unsubscribe();

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
  constructor(private route: ActivatedRoute, private clerkService: ClerkService, private router: Router, private afs: AngularFirestore) {

    this.appointmentId = this.route.snapshot.paramMap.get('id');

    console.log('this is the id ' + this.appointmentId);
    this.clerkMail = localStorage.getItem('email');

    this.appointMentSubscription = this.clerkService.getAppointmentData(this.appointmentId).subscribe(res => {
      console.log(res);
      this.appointment = res;
      this.clientEmail = this.appointment.email;








    })

    this.getAppointmentsOftheMAnager();




  }



  getAppointmentsOftheMAnager() {
    this.appointMentSubscription2 = this.afs.collection("managers").doc("abc@gmail.com").collection("appointments", ref => ref.where('date', '==', this.pipe.transform(this.date, 'MM-dd-y'))).valueChanges().subscribe(data => {
      // console.log(data);
      // this.x = data.length;
      if (data.length != 0) {
        console.log("there is a matching doc");

        // this.showVal = false;
        // this.x = data.length;

        // console.log(this.x);
        // this.showVal = true;

      }
      console.log(data.length);
      this.appointmentsOftheMAnagerCount = data.length;

    });
  }

  onSubmit(val) {
    console.log(val);
    let date: Date = val['dateFortheAppointment'];
    let pipe = new DatePipe('en-US'); // Use your own locale

    let formatDate = pipe.transform(date, 'y-MM-dd');
    console.log(formatDate);
    val['dateFortheAppointment'] = formatDate;
    val['clientEmail'] = localStorage.getItem('clientMail');
    this.clerkService.confirmAppointment(this.appointmentId, val, formatDate, this.timeFortheAppointment.value);
  }


  handleDateChange(event) {
    console.log(event);
    this.date = event;
    console.log(this.date);
    this.getAppointmentsOftheMAnager();
  }
  ngOnInit(): void {
  }

}
