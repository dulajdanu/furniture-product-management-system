import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';


export interface Appointment {
  status: number;
  descriptionOfOrder: string;
  methodOfContact: number;
  date: string;
  dateAdded: Date;
  address: string;
  checkTypes: Array<string>;
  dateFortheAppointment: string;
  timeFortheAppointment: string
}

export interface AppointmentId extends Appointment {
  id: string;
}

@Component({
  selector: 'ngx-ongoing-orders',
  templateUrl: './ongoing-orders.component.html',
  styleUrls: ['./ongoing-orders.component.scss']
})
export class OngoingOrdersComponent implements OnInit {
  numberOfOrders: number = 0;
  showRequestForm: boolean = false;
  showCloseicon: boolean = false;
  selectedOrder;
  headers = ["Name", "Quantity", "Total"];
  customerFeedback: string = "";
  Mail;
  rows = [

  ];

  is_there_ongoing_appointments: boolean = false; //to find whethere there are pending appointmnets
  ongoingAppointments: Array<any> = []; //this array is used to store the active appointments
  no_of_ongoing: number = 0;
  selectedOrderDetails;
  estimateDetails;
  showAcceptEstimateButton: boolean = true;
  showARequestEstimateButton: boolean = true;
  showARejectEstimateButton: boolean = true;
  email: string;
  appointmentSub: Subscription;
  estimateSub: Subscription;


  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private router: Router, private toastrService: NbToastrService, private userService: UserService) {
    this.email = localStorage.getItem('email');
    this.appointmentSub = this.userService.getAppointments().subscribe(res => {
      // console.log(res);
      // console.log('inside subscribe');
      if (res.length == 0) {
        this.numberOfOrders = 0;
      }
      else {
        this.ongoingAppointments = []; //clear the arrays before adding elements
        this.is_there_ongoing_appointments = false;
        this.numberOfOrders = res.length;
        res.forEach(element => {
          // console.log(element);


          if (element['status'] == 3) {
            this.ongoingAppointments.push(element); //if there is a active appointment push it to the active appointments array
          }
        });
        if (this.ongoingAppointments.length != 0) {
          this.is_there_ongoing_appointments = true; //checking the pending appointments array is empty or not
          this.no_of_ongoing = this.ongoingAppointments.length;
        }

      }

      console.log(this.ongoingAppointments);

    });
  }

  load() {
    console.log('avatar clicled');
    this.authService.SignOut();

  }

  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      home: true,
      link: '/user/home',

    },
    {
      title: 'current orders',
      icon: 'inbox-outline',
      link: '/user/current-orders'
    },
    {
      title: 'Ongoing orders',
      icon: 'browser-outline',
      link: '/user/ongoing-orders'
    },



  ];




  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.appointmentSub.unsubscribe();
    if (this.estimateSub != null) {
      this.estimateSub.unsubscribe();

    }
  }

  showDetails() {
    console.log("show details about the order");
    this.ongoingAppointments.forEach(element => {
      if (element['id'] == this.selectedOrder) {
        this.selectedOrderDetails = element;
      }
    });

    console.log(this.selectedOrderDetails);
    this.getEstimateDetails();
  }

  getEstimateDetails() {
    this.estimateSub = this.userService.getEstimateDetails(this.selectedOrder).subscribe(res => {
      console.log(res);
      this.estimateDetails = res;
      let values: Array<any> = this.estimateDetails['val'];
      values.forEach(element => {
        this.rows.push(element);
      });
    });
  }

  AcceptEstimate() {
    console.log('accept the estimate');
    this.showARejectEstimateButton = false;
    this.showARequestEstimateButton = false;
  }


  RequestAnotherEstimate() {
    console.log('request another');
    this.showAcceptEstimateButton = false;
    this.showARejectEstimateButton = false;

  }

  RejectEstimate() {
    console.log('reject estimate');
    this.showAcceptEstimateButton = false;
    this.showARequestEstimateButton = false;
  }

  submitResponse() {
    console.log('submit the response');
    console.log(this.customerFeedback);
    var res;
    if (this.showAcceptEstimateButton == true && (this.showARequestEstimateButton == false && this.showARejectEstimateButton == false)) {
      console.log('accept the estimate');
      this.userService.acceptEstimate(this.selectedOrderDetails['id'], this.selectedOrderDetails['email'], this.customerFeedback);

    }
    else if (this.showARequestEstimateButton == true && (this.showAcceptEstimateButton == false && this.showARejectEstimateButton == false)) {
      console.log('request  another estimate');
      this.userService.requestAnotherEstimate(this.selectedOrderDetails['id'], this.selectedOrderDetails['email'], this.customerFeedback);

    }
    else if (this.showARejectEstimateButton == true && (this.showAcceptEstimateButton == false && this.showARequestEstimateButton == false)) {
      console.log('rejecct   estimate');
      this.userService.rejectEstimate(this.selectedOrderDetails['id'], this.selectedOrderDetails['email'], this.customerFeedback);

    }
  }



}
