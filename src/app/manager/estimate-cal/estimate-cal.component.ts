import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'ngx-estimate-cal',
  templateUrl: './estimate-cal.component.html',
  styleUrls: ['./estimate-cal.component.scss']
})
export class EstimateCalComponent implements OnInit {

  numberOfOrders: number = 0;
  // showRequestForm: boolean = false;
  // showCloseicon: boolean = false;

  is_there_ongoingAppointments: boolean = false; //to find whethere there are pending appointmnets
  ongoing_Appointments: Array<any> = []; //this array is used to store the pending appointments
  no_of_ongoing: number = 0;


  selectedOrder: string; //this is sued to refer to the order selected by the manager



  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private managerService: ManagerService) {
    this.managerService.getAppointments().subscribe(res => {
      console.log(res);
      // console.log('inside subscribe');
      if (res.length == 0) {
        this.numberOfOrders = 0;
      }
      else {
        this.ongoing_Appointments = []; //clear the arrays before adding elements
        this.is_there_ongoingAppointments = false;
        this.numberOfOrders = res.length;
        res.forEach(element => {
          // console.log(element);

          if (element['status'] == 2) {
            this.ongoing_Appointments.push(element); //if there is a pending appointment push it to the pending appointments array
          }

        });
        if (this.ongoing_Appointments.length != 0) {
          this.is_there_ongoingAppointments = true; //checking the pending appointments array is empty or not
          this.no_of_ongoing = this.ongoing_Appointments.length;
        }

      }

      console.log(this.ongoing_Appointments);
      // console.log(this.is_there_newAppointments);
      // console.log(this.activeAppointments);
      // console.log(this.newAppointments);
    });
  }

  ngOnInit(): void {
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  load() {
    console.log('avatar clicled');
    this.authService.SignOut();

  }




  values = [
    {
      'val': 0,
      'name': 'dulaj'
    },
    {
      'val': 2,
      'name': 'nim'
    },
  ];

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

}