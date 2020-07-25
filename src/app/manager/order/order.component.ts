import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../manager.service';
import { CalenderCustomDayCellComponentComponent } from '../calender-custom-day-cell-component/calender-custom-day-cell-component.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'ngx-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  date = new Date();

  dayCellComponent = CalenderCustomDayCellComponentComponent;
  showDatePicker: boolean = false;
  appointment: Appointment = <Appointment>{
    dateAdded: new Date
  }; //this variable is used to store the document data
  appointmentStatus: number = 0; //the status of the appointment is initally set to 0
  appointmentStatusMSg: string = "Pending"; // this is used to show the appointment view
  appointMentMethodOfContact: string = "Phone";
  typesRequired: Array<string> = [];; //what are the requests of the user in the short hand format
  typesRequiredStringArray: Array<string> = []; //converting the requests of the user in short hand format to a readable format
  showCancelAppointmentDialogBox: boolean = false;
  clientEmail: string = "";
  appointmentsOftheMAnager;
  appointmentsOftheMAnagerCount: number = 0;
  Mail;
  pipe = new DatePipe('en-US'); // Use your own locale
  dateToday: string = this.pipe.transform(Date(), 'MM-dd-y')
  confirmOrderForm = new FormGroup({

    // dateFortheAppointmentForm: new FormControl('', Validators.required),
    timeFortheAppointmentForm: new FormControl('',),

  });
  constructor(private route: ActivatedRoute, private managerService: ManagerService, private router: Router, private afs: AngularFirestore) {
    this.Mail = localStorage.getItem('email');
    this.appointmentId = this.route.snapshot.paramMap.get('id');

    console.log('this is the id ' + this.appointmentId);

    this.managerService.getAppointmentData(this.appointmentId).subscribe(res => {
      console.log(res);
      this.typesRequired = [];
      this.typesRequiredStringArray = [];
      this.appointment = res;
      this.appointmentStatus = this.appointment.status;
      console.log(this.appointment.dateAdded);
      this.clientEmail = this.appointment.email;


      if (this.appointmentStatus == 0) {

      }
      else if (this.appointmentStatus == 1) {
        this.appointmentStatusMSg = "Active";
      }
      else {
        this.appointmentStatusMSg = "Completed";
      }

      if (this.appointment.methodOfContact == 0) {

      }
      else {
        this.appointMentMethodOfContact = "E - mail"
      }

      this.appointment.checkTypes.forEach(element => {
        this.typesRequired.push(element);
      });
      console.log(this.typesRequired);
      this.typesRequired.forEach(element => {
        switch (element) {
          case "0":
            this.typesRequiredStringArray.push("Gate");
            break;
          case "1":
            this.typesRequiredStringArray.push("Door");
            break;
          case "2":
            this.typesRequiredStringArray.push("Hand-Rail");
            break;
          case "3":
            this.typesRequiredStringArray.push("Table");
            break;
          case "4":
            this.typesRequiredStringArray.push("Chair");
            break;
          case "5":
            this.typesRequiredStringArray.push("Wall-Art");
            break;
          case "6":
            this.typesRequiredStringArray.push("Window Grill");
            break;
          case "7":
            this.typesRequiredStringArray.push("Other");
            break;

        }
      });



    })



  }


  get dateFortheAppointmentForm() {
    return this.confirmOrderForm.get('dateFortheAppointmentForm');
  }

  get timeFortheAppointmentForm() {
    return this.confirmOrderForm.get('timeFortheAppointmentForm');
  }

  appointmentId: string = "";
  ngOnInit() {
    this.appointment.dateAdded = "";



  }

  getAppointmentsOftheMAnager() {
    this.afs.collection("managers").doc(localStorage.getItem("email")).collection("appointments", ref => ref.where('date', '==', this.pipe.transform(this.date, 'MM-dd-y'))).valueChanges().subscribe(data => {
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

  cancelAppointment(appointmentId: string,) {
    console.log(appointmentId);
    console.log(this.clientEmail);
    this.managerService.cancelAppointment(appointmentId, this.clientEmail);

  }
  confirmAppointment(appointmentId) {
    console.log('inside confirm order');
    console.log("hiii");
    this.showDatePicker = true;
    // console.log(default2);


  }

  handleDateChange(event) {
    console.log(event);
    this.getAppointmentsOftheMAnager();
  }


  onSubmit(val) {
    console.log(val);
    console.log(this.date);
    if (this.timeFortheAppointmentForm.value != "") {
      console.log("submit values");
      this.managerService.confirmAppointment(this.appointmentId, this.clientEmail, this.pipe.transform(this.date, 'MM-dd-y'), this.timeFortheAppointmentForm.value);
      localStorage.setItem('clientMail', this.clientEmail);
      // this.router.navigate(['confirmOrder'], { relativeTo: this.route });
      // this.router.navigateByUrl("/manager/home");

    }
  }


}

export interface Appointment {
  status: number;
  descriptionOfOrder: string;
  methodOfContact: number;
  dateFortheAppointment: string;
  dateAdded: any;
  address: string;
  checkTypes: Array<string>;
  email: string;
  phone: string;
  confirmedBy: string;
  image: string
}

export interface AppointmentId extends Appointment {
  id: string;
}




