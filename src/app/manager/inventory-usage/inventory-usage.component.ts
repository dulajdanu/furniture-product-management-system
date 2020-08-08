import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-inventory-usage',
  templateUrl: './inventory-usage.component.html',
  styleUrls: ['./inventory-usage.component.scss']
})
export class InventoryUsageComponent implements OnInit {

  date = new Date();
  monthSelected;
  yearSelected;
  inventoryUsageReports;
  inventorySub: Subscription;
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

  constructor(private managerService: ManagerService, private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.inventorySub.unsubscribe();
  }

  getReports() {
    console.log('get reports');
    console.log(this.yearSelected);
    console.log(this.monthSelected);
    this.inventorySub = this.managerService.getInventoryUsageReports(this.yearSelected + this.monthSelected).subscribe(res => {
      this.inventoryUsageReports = res;
      console.log(this.inventoryUsageReports);

    });

  }

}
