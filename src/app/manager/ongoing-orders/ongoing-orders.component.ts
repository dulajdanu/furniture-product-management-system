import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbToastrService, NbMenuItem } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'ngx-ongoing-orders',
  templateUrl: './ongoing-orders.component.html',
  styleUrls: ['./ongoing-orders.component.scss']
})
export class OngoingOrdersComponent implements OnInit {
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
  note: string;
  addPhotos: boolean = false;
  userFeedback: Array<string>;
  Mail;

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }

  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private router: Router, private toastrService: NbToastrService, private managerService: ManagerService) {

    this.Mail = localStorage.getItem('email');
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
      link: '/manager/home',

    },

    {
      title: 'Estimate Calculator',
      icon: 'pricetags-outline',
      link: '/manager/estimate-calculator'

    },
    {
      title: 'Order',
      icon: 'inbox-outline',
      link: '/manager/ongoing-orders'

    },
    {
      title: 'Reports',
      icon: 'archive-outline',
      link: '/manager/reports'

    },
    {
      title: 'Add Staff',
      icon: 'people-outline',
      link: '/manager/add-staff'

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

  showPhotoInput() {
    this.addPhotos = !this.addPhotos;
  }


  getDataAboutOrderProgress(id: string) {
    console.log('get data about order progress');
    this.managerService.getProgressOfaOrder(id).valueChanges().subscribe(res => {
      this.progressDetails = res;
      console.log(this.progressDetails);
      this.userFeedback = this.progressDetails['userFeedback'];

    })
  }

  changeProgress() {
    this.managerService.changeProgress(this.selectedOrderDetails['id'], this.selectedOrderDetails['email'], this.progressAdded, this.note);
    this.showProgressInputBox = false;
    this.note = '';
    this.progressAdded = 0;

  }
  showInputBox() {
    this.showProgressInputBox = true;
  }

  submitPhotos() {
    console.log('submit photos');
    this.managerService.addPhotosofProgress(this.selectedOrderDetails['id'], this.selectedOrderDetails['email'], this.files);
    this.addPhotos = false;


  }

}
