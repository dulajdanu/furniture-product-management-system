import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from '../manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

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
  Mail;
  appointmentSub: Subscription;
  constructor(private route: ActivatedRoute, private managerService: ManagerService, private router: Router) {
    this.Mail = localStorage.getItem('email');
    this.appointmentId = this.route.snapshot.paramMap.get('id');

    console.log('this is the id ' + this.appointmentId);

    this.appointmentSub = this.managerService.getAppointmentData(this.appointmentId).subscribe(res => {
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

  appointmentId: string = "";
  ngOnInit() {
    this.appointment.dateAdded = "";
  }

  ngOnDestroy() {
    this.appointmentSub.unsubscribe()
  }

  cancelAppointment(appointmentId: string,) {
    console.log(appointmentId);
    console.log(this.clientEmail);
    this.managerService.cancelAppointment(appointmentId, this.clientEmail);

  }
  confirmAppointment(appointmentId) {
    console.log('inside confirm order');
    this.managerService.confirmAppointment(appointmentId, this.clientEmail);
    // localStorage.setItem('clientMail', this.clientEmail);
    // this.router.navigate(['confirmOrder'], { relativeTo: this.route });

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

