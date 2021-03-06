import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuItem } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../user.service';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
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


  appointmentsCount: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  appointmentsFieldsInDoc: string[] = ['count01', 'count02', 'count03', 'count04', 'count05', 'count06', 'count07', 'count08', 'count09', 'count10', 'count11', 'count12'];
  fetchingDataCompleted: boolean = false;
  //
  //data regarding the graph is added here



  public lineChartData: ChartDataSets[] = [
    { data: this.appointmentsCount, label: 'Number of appointments' },
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

  //
  Mail;
  appointmentSub: Subscription;
  appointmentSub2: Subscription;
  totalNumberOfBookings;

  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private userService: UserService, private afs: AngularFirestore, private datePipe: DatePipe) {
    this.Mail = localStorage.getItem('email');
    console.log(this.Mail);
    this.appointmentSub = this.userService.getAppointments().subscribe(res => {
      // console.log(res);
      // console.log('inside subscribe');
      if (res.length == 0) {
        this.numberOfOrders = 0;
      }
      else {
        this.pendingAppointments = [];
        this.activeAppointments = []; //clear the arrays before adding elements
        this.is_there_pendingAppointments = false;
        this.is_there_ActiveAppointments = false;
        this.numberOfOrders = res.length;
        res.forEach(element => {
          // console.log(element);

          if (element['status'] == 0) {
            this.pendingAppointments.push(element); //if there is a pending appointment push it to the pending appointments array
          }
          else if (element['status'] == 1) {
            this.activeAppointments.push(element); //if there is a active appointment push it to the active appointments array
          }
        });
        if (this.pendingAppointments.length != 0) {
          this.is_there_pendingAppointments = true; //checking the pending appointments array is empty or not
          this.no_of_pending = this.pendingAppointments.length;
        }
        if (this.activeAppointments.length != 0) {
          this.is_there_ActiveAppointments = true; //checking the active appointments array is empty or not
          this.no_of_active = this.activeAppointments.length;
        }
      }

      console.log(this.is_there_ActiveAppointments);
      console.log(this.is_there_pendingAppointments);
      console.log(this.activeAppointments);
      console.log(this.pendingAppointments);
    });


    this.afs.collection("users").doc(localStorage.getItem("email")).collection("requests").doc(this.datePipe.transform(Date.now(), 'yyyy')).valueChanges().subscribe(res => {
      console.log("request doc of this")
      console.log(res);
      this.totalNumberOfBookings = res['totalRequests'];
      for (let index = 0; index < this.appointmentsFieldsInDoc.length; index++) {
        if (res[this.appointmentsFieldsInDoc[index]] != null) {
          this.appointmentsCount[index] = res[this.appointmentsFieldsInDoc[index]];
          console.log("inside if ")

        }

      }
      this.fetchingDataCompleted = true;
    });




  }

  numberOfOrders: number = 0;
  showRequestForm: boolean = false;
  showCloseicon: boolean = false;

  is_there_pendingAppointments: boolean = false; //to find whethere there are pending appointmnets
  pendingAppointments: Array<any> = []; //this array is used to store the pending appointments
  no_of_pending: number = 0;
  is_there_ActiveAppointments: boolean = false; //to find whethere there are active appointments
  activeAppointments: Array<any> = []; //this array is used to store the active appointments
  no_of_active: number = 0;









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

  // getAppointments() {

  //   this.userService.getAppointments();



  // }
  ngOnDestroy() {
    // ...
    console.log('on destroy called');
    // this.userService.getAppointments().subscribe().unsubscribe();
    this.appointmentSub.unsubscribe();
  }

  request() {
    console.log("show the form for the user");
    this.showRequestForm = true;
    this.showCloseicon = true;

  }
  hide() {
    this.showRequestForm = false;
    this.showCloseicon = false;

  }




}
