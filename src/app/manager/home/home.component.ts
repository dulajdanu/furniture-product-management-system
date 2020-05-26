import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuItem, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { ManagerService } from '../manager.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';



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
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pipe = new DatePipe('en-US'); // Use your own locale

  showToast(status: NbComponentStatus, message: string) { //function used to show toast messages
    this.toastrService.show(status, message, { status });
  }

  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private managerService: ManagerService, private router: Router, private toastrService: NbToastrService
  ) {
    console.log(this.pipe.transform(Date(), 'MM-dd-y'));
    console.log(this.pipe.transform(Date(), 'h:mm a'));
    this.managerService.getAppointments().subscribe(res => {
      console.log(res);
      // console.log('inside subscribe');
      if (res.length == 0) {
        this.numberOfOrders = 0;
      }
      else {
        this.newAppointments = [];
        this.activeAppointments = []; //clear the arrays before adding elements
        this.is_there_newAppointments = false;
        this.is_there_activeAppointments = false;
        this.numberOfOrders = res.length;
        res.forEach(element => {
          // console.log(element);

          if (element['status'] == 0) {
            this.newAppointments.push(element); //if there is a pending appointment push it to the pending appointments array
          }
          else if (element['status'] == 1) {

            this.activeAppointments.push(element); //if there is a active appointment push it to the active appointments array

          }
        });
        if (this.newAppointments.length != 0) {
          this.is_there_newAppointments = true; //checking the pending appointments array is empty or not
          this.no_of_new = this.newAppointments.length;
        }
        if (this.activeAppointments.length != 0) {
          this.is_there_activeAppointments = true; //checking the active appointments array is empty or not
          this.no_of_active = this.activeAppointments.length;
        }
      }

      console.log(this.is_there_activeAppointments);
      console.log(this.is_there_newAppointments);
      console.log(this.activeAppointments);
      console.log(this.newAppointments);
    });


    this.managerService.getAppointmentsofaClerk().subscribe(res => {
      console.log(res);
      if (res.length == 0) { }
      else {
        res.forEach(element => {
          console.log(element);
          if ((element['dateFortheAppointment'] === this.pipe.transform(Date(), 'MM-dd-y')) && element['timeFortheAppointment'] === this.pipe.transform(Date(), 'h:mm a')) {
            this.showToast('warning', `You have a appointment at ${element['timeFortheAppointment']}`);

          }
        });
      }
    });

  }

  numberOfOrders: number = 0;
  showRequestForm: boolean = false;
  showCloseicon: boolean = false;

  is_there_activeAppointments: boolean = false; //to find whethere there are pending appointmnets
  activeAppointments: Array<any> = []; //this array is used to store the pending appointments
  no_of_active: number = 0;
  is_there_newAppointments: boolean = false; //to find whethere there are active appointments
  newAppointments: Array<any> = []; //this array is used to store the active appointments
  no_of_new: number = 0;


  loadOrder(val) {
    this.router.navigate(['/manager/order/', val]);
    // console.log(val);
  }






  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
  ngOnInit(): void {
    // this.getAppointments();
    // this.userService.getAppointments().subscribe().unsubscribe();

  }
  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      home: true,
      link: '/manager/home',

    },
    {
      title: 'Profile',
      icon: 'person-outline',
      link: '/clerk/profile'
    },
    {
      title: 'Estimate Calculator',
      icon: 'pricetags-outline',
      link: '/manager/estimate-calculator'

    },


  ];

  load() {
    console.log('avatar clicled');
    this.authService.SignOut();

  }

  // getAppointments() {

  //   this.userService.getAppointments();



  // }
  ngOnDestroy() {
    // ...
    console.log('on destroy called');
  }

  // request() {
  //   console.log("show the form for the user");
  //   this.showRequestForm = true;
  //   this.showCloseicon = true;

  // }
  // hide() {
  //   this.showRequestForm = false;
  //   this.showCloseicon = false;

  // }




}



