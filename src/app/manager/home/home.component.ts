import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuItem, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { ManagerService } from '../manager.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { AngularFirestore } from '@angular/fire/firestore';
import { report } from 'process';



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

  appointmentsCount: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  acceptedAppointmentsCount: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  appointmentsFieldsInDoc: string[] = ['count01', 'count02', 'count03', 'count04', 'count05', 'count06', 'count07', 'count08', 'count09', 'count10', 'count11', 'count12'];
  fetchingDataCompleted: boolean = false;
  totalRejectedCount;

  fetchingDataCompletedForRejected: boolean = false;
  totalAcceptedCount;



  typesCount: number[] = [0, 0,]; //this is used when showing the types graph
  typesFieldsInDoc: string[] = ['custom', 'single'];


  public lineChartData: ChartDataSets[] = [
    { data: this.appointmentsCount, label: 'Number of rejected appointments' },
    {
      data: this.acceptedAppointmentsCount, label: 'Number of Accepted Appointments'
    }
  ];
  public lineChartLabels: Label[] = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // public lineChartOptions: (ChartOptions & { annotation: any }) = {
  //   responsive: true,
  // };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];




  public lineChartDataforTypes: ChartDataSets[] = [
    { data: this.typesCount, label: 'Number of orders' },

  ];
  public lineChartLabelsforTypes: Label[] = ['Custom', 'Single',];
  // public lineChartOptions: (ChartOptions & { annotation: any }) = {
  //   responsive: true,
  // };
  public lineChartColorsforTypes: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,0,255,0.3)',
    },
  ];
  public lineChartLegendforTypes = true;
  public lineChartTypeforTypes = 'bar';
  public lineChartPluginsforTypes = [];



  pipe = new DatePipe('en-US'); // Use your own locale
  Mail;
  appointmentSub: Subscription;
  appointmentSub2: Subscription;

  showToast(status: NbComponentStatus, message: string) { //function used to show toast messages
    this.toastrService.show(status, message, { status });
  }

  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private managerService: ManagerService, private router: Router, private toastrService: NbToastrService, private afs: AngularFirestore, private datePipe: DatePipe
  ) {
    this.Mail = localStorage.getItem('email');
    console.log(this.pipe.transform(Date(), 'MM-dd-y'));
    console.log(this.pipe.transform(Date(), 'h:mm a'));
    this.appointmentSub = this.managerService.getAppointments().subscribe(res => {
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
        this.is_there_ongoing_appointments = false;
        this.no_of_ongoing = 0;
        this.ongoingAppointments = [];
        this.numberOfOrders = res.length;
        res.forEach(element => {
          // console.log(element);

          if (element['status'] == 0) {
            this.newAppointments.push(element); //if there is a pending appointment push it to the pending appointments array
          }
          else if (element['status'] == 1) {

            this.activeAppointments.push(element); //if there is a active appointment push it to the active appointments array

          }
          else if (element['status'] == 4 || element['status'] == -3 || element['status'] == -4) {
            this.ongoingAppointments.push(element);
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
        if (this.ongoingAppointments.length != 0) {
          this.is_there_ongoing_appointments = true; //checking the active appointments array is empty or not
          this.no_of_ongoing = this.ongoingAppointments.length;
        }

      }

      console.log(this.is_there_activeAppointments);
      console.log(this.is_there_newAppointments);
      console.log(this.activeAppointments);
      console.log(this.newAppointments);
      console.log(this.ongoingAppointments);
    });


    this.appointmentSub2 = this.managerService.getAppointmentsofaClerk().subscribe(res => {
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


    this.afs.collection("reports").doc("RejectedReport").collection(this.datePipe.transform(Date.now(), 'yyyy')).doc("report").valueChanges().subscribe(res => {
      console.log("request doc of this")
      console.log(res);
      this.totalRejectedCount = res['total'];
      for (let index = 0; index < this.appointmentsFieldsInDoc.length; index++) {
        if (res[this.appointmentsFieldsInDoc[index]] != null) {
          this.appointmentsCount[index] = res[this.appointmentsFieldsInDoc[index]];
          console.log("inside if ")

        }

      }
      // this.fetchingDataCompleted = true;
    });


    this.afs.collection("reports").doc("AcceptedReport").collection(this.datePipe.transform(Date.now(), 'yyyy')).doc("report").valueChanges().subscribe(res => {
      console.log("request doc of this")
      console.log(res);
      this.totalAcceptedCount = res['total'];
      for (let index = 0; index < this.appointmentsFieldsInDoc.length; index++) {
        if (res[this.appointmentsFieldsInDoc[index]] != null) {
          this.acceptedAppointmentsCount[index] = res[this.appointmentsFieldsInDoc[index]];
          console.log("inside if ")

        }

      }
      // this.fetchingDataCompleted = true;
    });


    this.afs.collection("reports").doc("OrderTypes").collection(this.datePipe.transform(Date.now(), 'yyyy')).doc("report").valueChanges().subscribe(res => {
      console.log(res);
      for (let index = 0; index < this.typesFieldsInDoc.length; index++) {
        if (res[this.typesFieldsInDoc[index]] != null) {
          this.typesCount[index] = res[this.typesFieldsInDoc[index]];
          console.log("inside if ")

        }

      }
      this.fetchingDataCompleted = true;
      console.log(this.typesCount);
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

  is_there_ongoing_appointments: boolean = false; //to find whethere there are pending appointmnets
  ongoingAppointments: Array<any> = []; //this array is used to store the active appointments
  no_of_ongoing: number = 0;

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
    {
      title: 'Search Appointments',
      icon: 'search-outline',
      link: '/manager/search'

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
    this.appointmentSub.unsubscribe();
    this.appointmentSub2.unsubscribe();
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

  sendAnotherEstimate(id: string, email) {

    this.managerService.sendAnotherEstimate(id, email);

    this.router.navigate(['/manager/estimate-calculator']);


  }

  startOrder(id, email) {

    this.managerService.startOrder(id, email);
  }

  estimateRejected(id, email) {
    console.log('estimate rejected by the user');
  }




}



