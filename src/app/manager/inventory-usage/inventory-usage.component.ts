import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';


export interface CustomRow {
  id: string;
  name: string;
  // quantity: number;
  stockAdded: number;
  stockRem: number;

}


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
  source: LocalDataSource; // add a property to the component
  data = [];
  itemsInReport: CustomRow[] = [];

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

  ];

  settings = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        filter: false
      },
      name: {
        title: 'Name',
        filter: false
      },
      // quantity: {
      //   title: 'Quantity',
      //   filter: false
      // },
      stockAdded: {
        title: 'Stock Added',
        filter: false
      },
      stockRem: {
        title: 'Stock Removed',
        filter: false
      },
    }
  };

  constructor(private managerService: ManagerService, private datePipe: DatePipe) { }

  checkValueExistence = roleParam => this.itemsInReport.some(({ id }) => id == roleParam)

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.inventorySub != null) {
      this.inventorySub.unsubscribe();

    }
  }

  getReports() {
    this.itemsInReport = [];
    this.inventoryUsageReports = null;


    let customRow: CustomRow = {
      id: "",
      name: "",
      // quantity: 0,
      stockAdded: 0,
      stockRem: 0,
    };
    console.log('get reports');
    console.log(this.yearSelected);
    console.log(this.monthSelected);
    this.inventorySub = this.managerService.getInventoryUsageReports(this.yearSelected + this.monthSelected).subscribe(res => {
      this.inventoryUsageReports = res;
      console.log(this.inventoryUsageReports);
      res.forEach(element => {
        if (element["status"] != "itemAdded") {
          element["val"].forEach(el => {



            if (this.checkValueExistence(el["ID"])) {
              //if this is true it means the value is in the list so we have to increate the count
              this.itemsInReport.forEach(elementIn => {
                if (elementIn.name == el["ID"]) {
                  // elementIn.quantity = elementIn.quantity + el["Quantity"]
                  if (element["status"] == "stockAdded") {
                    elementIn.stockAdded = elementIn.stockAdded + el["Quantity"]

                  }
                  else {
                    elementIn.stockRem = elementIn.stockRem + el["Quantity"];
                  }
                }

              });

            }
            else {
              //item is not in the list so we have to add the item 
              customRow.id = el["ID"];
              customRow.name = el["Name"];
              // customRow.quantity = el["Quantity"];
              // customRow.status = element["status"];
              if (element["status"] == "stockAdded") {
                customRow.stockAdded = el["Quantity"]

              }
              else {
                customRow.stockRem = el["Quantity"];
              }
              this.itemsInReport.push(customRow);

            }


            // this.data.push(
            //   customRow

            // );
            // console.log(el);
            customRow = {
              id: "",
              name: "",
              // quantity: 0,
              stockAdded: 0,
              stockRem: 0,
            };
          });


        }
      });


    });

    this.source = new LocalDataSource(this.itemsInReport);



  }




}



