import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';


export interface CustomRow {
  id: string;
  email: string;
  feedback: string;

}

@Component({
  selector: 'ngx-reject-job-report',
  templateUrl: './reject-job-report.component.html',
  styleUrls: ['./reject-job-report.component.scss']
})
export class RejectJobReportComponent implements OnInit {

  date = new Date();
  monthSelected;
  yearSelected;
  inventoryUsageReports;
  reportSub: Subscription;
  itemsInReport: CustomRow[] = [];
  source: LocalDataSource; // add a property to the component


  months = [{
    'name': 'Jan',
    'val': '01'
  },
  {
    'name': 'Feb',
    'val': '02'
  },
  {
    'name': 'Mar',
    'val': '03'
  },
  {
    'name': 'April',
    'val': '04'
  },
  {
    'name': 'May',
    'val': '05'
  },
  {
    'name': 'June',
    'val': '06'
  },
  {
    'name': 'July',
    'val': '07'
  },
  {
    'name': 'Aug',
    'val': '08'
  },
  {
    'name': 'Sep',
    'val': '09'
  },
  {
    'name': 'Oct',
    'val': '10'
  },
  {
    'name': 'Nov',
    'val': '11'
  },
  {
    'name': 'Dec',
    'val': '12'
  },
  ];

  years = [
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',

  ]

  settings = {
    actions: false,
    columns: {
      id: {
        title: 'Order ID',
        filter: false
      },
      email: {
        title: 'Client Email',
        filter: false
      },
      // quantity: {
      //   title: 'Quantity',
      //   filter: false
      // },
      feedback: {
        title: 'Feedback of the client',
        filter: false
      },

    }
  };

  constructor(private managerService: ManagerService, private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  getReports() {
    this.itemsInReport = [];
    this.inventoryUsageReports = null;

    // console.log('get reports');
    // console.log(this.yearSelected);
    // console.log(this.monthSelected);
    let customRow: CustomRow = {
      id: "",
      email: "",
      // quantity: 0,
      feedback: "",
    };
    this.reportSub = this.managerService.getRejectedReports(this.yearSelected + this.monthSelected).subscribe(res => {
      this.inventoryUsageReports = res;
      console.log(this.inventoryUsageReports);
      res.forEach(element => {
        customRow.email = element["email"];
        customRow.feedback = element["feedback"];
        customRow.id = element['id'];

        this.itemsInReport.push(customRow);

        customRow = {
          email: "",
          feedback: "",
          id: "",
        };


      });


    });

    this.source = new LocalDataSource(this.itemsInReport);


  }

  ngOnDestroy() {
    this.reportSub.unsubscribe();
  }

}

