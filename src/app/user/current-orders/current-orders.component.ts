import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbToastrService, NbMenuItem } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ManagerService } from '../../manager/manager.service';
import { UserService } from '../user.service';

@Component({
  selector: 'ngx-current-orders',
  templateUrl: './current-orders.component.html',
  styleUrls: ['./current-orders.component.scss']
})
export class CurrentOrdersComponent implements OnInit {

  selectedOrderDetails;
  is_there_ongoingAppointments: boolean = false; //to find whethere there are pending appointmnets
  ongoing_Appointments: Array<any> = []; //this array is used to store the pending appointments
  no_of_ongoing: number = 0;
  numberOfOrders: number;
  selectedOrder;
  progressDetails;
  linearMode = true;
  progressAdded: number = 0;
  showProgressInputBox: boolean = false;
  showFeedBackInput: boolean = false;
  feedBackOftheUser: string;


  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }


  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private router: Router, private toastrService: NbToastrService, private managerService: ManagerService, private userService: UserService) {
    this.managerService.getAppointments().subscribe(res => {
      // console.log(res);
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

          if (element['status'] == 5) {
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

  load() {
    console.log('avatar clicled');
    this.authService.SignOut();

  }
  showDetails(order) {
    // console.log(order);
    this.selectedOrderDetails = order;
    console.log(this.selectedOrderDetails);
    this.getDataAboutOrderProgress(order['id']);
  }




  getDataAboutOrderProgress(id: string) {
    console.log('get data about order progress');
    this.managerService.getProgressOfaOrder(id).valueChanges().subscribe(res => {
      this.progressDetails = res;
      console.log(this.progressDetails);

    })
  }


  showFeedbackInputBox() {
    this.showFeedBackInput = !this.showFeedBackInput;
  }

  submitFeedback() {
    console.log('submit feedback');
    this.showFeedBackInput = false;
    this.feedBackOftheUser = null;
    this.userService.addFeedbackNotesforCurrentOrder(this.selectedOrderDetails['id'], this.selectedOrderDetails['email'], this.feedBackOftheUser);
  }


}




