import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ClerkService } from '../clerk.service';

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
  appointmentStatusMSg: string = "Penidng"; // this is used to show the appointment view

  constructor(private route: ActivatedRoute, private clerkService: ClerkService) {

    this.appointmentId = this.route.snapshot.paramMap.get('id');

    console.log('this is the id ' + this.appointmentId);

    this.clerkService.getAppointmentData(this.appointmentId).subscribe(res => {
      console.log(res);
      this.appointment = res;
      this.appointmentStatus = this.appointment.status;
      console.log(this.appointment.dateAdded);



    })
    if (this.appointmentStatus == 0) {

    }
    else if (this.appointmentStatus == 1) {
      this.appointmentStatusMSg = "Active";
    }
    else {
      this.appointmentStatusMSg = "Completed";
    }


  }

  appointmentId: string = "";
  ngOnInit() {
    this.appointment.dateAdded = "";
  }


}

export interface Appointment {
  status: number;
  descriptionOfOrder: string;
  methodOfContact: number;
  date: string;
  dateAdded: any;
  address: string;
  checkTypes: Array<string>
}
