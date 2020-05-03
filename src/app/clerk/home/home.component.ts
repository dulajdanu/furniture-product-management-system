import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuItem } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { ClerkService } from '../clerk.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



export interface Appointment {
  status: number;
  descriptionOfOrder: string;
  methodOfContact: number;
  date: string;
  dateAdded: Date;
  address: string;
  checkTypes: Array<string>
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

  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private clerkService: ClerkService, private router: Router) {

    this.clerkService.getAppointments().subscribe(res => {
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
    this.router.navigateByUrl('/clerk/order');
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
      link: '/clerk/home',

    },
    {
      title: 'Profile',
      icon: 'person-outline',
      link: '/clerk/profile'
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
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
