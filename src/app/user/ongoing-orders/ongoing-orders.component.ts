import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


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

  is_there_ongoing_appointments: boolean = false; //to find whethere there are pending appointmnets
  ongoingAppointments: Array<any> = []; //this array is used to store the active appointments
  no_of_ongoing: number = 0;
  selectedOrderDetails;
  estimateDetails;
  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private router: Router, private toastrService: NbToastrService, private userService: UserService) {
    this.userService.getAppointments().subscribe(res => {
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
      title: 'Profile',
      icon: 'person-outline',
      link: '/user/profile'
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
    this.userService.getEstimateDetails(this.selectedOrder).subscribe(res => {
      console.log(res);
      this.estimateDetails = res;
    });
  }

}
