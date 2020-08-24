import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { ManagerService } from '../manager.service';
import { InventoryService } from '../../clerk/inventory/inventory.service';
import { Observable, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';

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
  selectedOrderDetails;//this is used to show details about the selected appointment
  typesRequiredStringArray: Array<string> = []; // this array is used to show the types the user asked

  selectedOrder: string; //this is used to refer to the order selected by the manager

  itemsAdded = []; //items added by user to add to stock

  itemsObservable: Observable<Item[]>;
  itemsofInventory: Item[];
  itemsMap: { value: string, title: string }[] = []; //this is used to create the dropdown in the table

  Mail;
  itemId: string = '';
  itemName: string = '';
  itemQty: number = 0;
  totalValue: number = 0;
  profitPercentage: number = 0;
  labourCost: number = 0;
  dateOfCompletion: string;
  pipe = new DatePipe('en-US'); // Use your own locale
  appointmentSub: Subscription;
  appointmentSub2: Subscription;

  //  formatDate = pipe.transform(date, 'MM-dd-y');



  headers = ["ID", "Name", "Quantity", "Additional", "Total"];

  rows = [

  ];

  settings = { //these settings are for the table which is used to get item data
    // hideSubHeader: true,

    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'Item ID',
        editable: false,


      },
      name: {
        title: 'Item Name',

      },


      quantity: {
        title: 'Item Quantity'
      },
      cost: {
        title: 'Item Cost'
      },


    }
  }


  estimatesDocs: Observable<any[]>;


  onUserRowSelect(event): void {
    // console.log(this.itemsAdded);
    // console.log(event);
    let flag: number = 0; //we keep this flag to check if this already exist in the items list

    this.rows.forEach(element => {
      console.log('for loop');
      if (element['ID'] == event.data.id) {
        element['Quantity'] = element['Quantity'] + 1;
        flag = 1;
        console.log('item exist');
        this.totalValue = element['cost'] + this.totalValue;

        element['Total'] = element['Quantity'] * element['cost'] + element['Additional'];



      }




    });

    if (flag == 0) {
      this.rows.push({
        'ID': event.data.id,
        'Name': event.data.name,
        'Quantity': 1,
        'Additional': 0,
        'Total': event.data.cost,
        'cost': event.data.cost
      });
      this.totalValue = event.data.cost + this.totalValue;

    }

  }

  // AddItem() {
  //   let flag: number = 0; //we keep this flag to check if this already exist in the items list
  //   // console.log(this.itemId);
  //   // console.log(this.itemName);
  //   // console.log(this.itemQty);

  //   this.rows.forEach(element => {
  //     console.log('for loop');
  //     if (element['ID'] == this.itemId) {
  //       element['Quantity'] = element['Quantity'] + 1;
  //       flag = 1;
  //       console.log('item exist');
  //       element['Total'] = element['Quantity'] * element['cost'] + element['Additional'];

  //     }



  //   });
  //   if (flag == 0) {
  //     this.rows.push({
  //       'ID': this.itemId,
  //       'Name': this.itemName,
  //       'Quantity': Number(this.itemQty),
  //       // 'Additional':0,
  //       // 'Total':this.
  //     });
  //   }



  //   this.itemName = "";
  //   this.itemId = "";
  //   this.itemQty = 0;

  // }

  sendEstimate() {
    // console.log(this.rows);
    // console.log('add all items to stock');
    this.managerService.sendEstimate(this.rows, this.selectedOrderDetails, this.totalValue, this.labourCost, this.pipe.transform(this.dateOfCompletion));
    // this.itemName = "";
    // this.itemId = "";
    // this.itemQty = 0;
    // this.rows = [];
  }

  onKey(event, val, col) { //this function is used to update the total when user change the table
    const inputValue = event.target.value;
    console.log(inputValue);
    console.log(val);
    console.log(col);
    this.totalValue = 0; //first the total is initialized to zero



    if (col == 'Quantity') {
      this.rows.forEach(element => {
        if (element['ID'] == val['ID']) {

          element['Total'] = element['Quantity'] * element['cost'] + element['Additional'];
          this.totalValue = this.totalValue + element['cost'] * element['Quantity'] + element['Additional'];

        }
        else {
          this.totalValue = this.totalValue + element['cost'] * element['Quantity'] + element['Additional'];

        }
      });
    }

    else {
      this.rows.forEach(element => {
        if (element['ID'] == val['ID']) {
          // this.totalValue = this.totalValue - element['Additional'];

          element['Total'] = element['Quantity'] * element['cost'] + element['Additional'];
          this.totalValue = this.totalValue + element['cost'] * element['Quantity'] + element['Additional'];

        }
        else {
          this.totalValue = this.totalValue + element['cost'] * element['Quantity'] + element['Additional'];

        }
      });
    }

  }


  addProfitPercentage() {
    //this function is used to add profit percentage to total
    this.totalValue = this.totalValue + this.totalValue / 100 * this.profitPercentage;
  }

  addLabourCost() {
    console.log('add labour cost to the database');
    this.totalValue = this.totalValue + this.labourCost;
    console.log(this.dateOfCompletion);
  }





  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private managerService: ManagerService, private inventoryService: InventoryService, private afs: AngularFirestore) {
    this.Mail = localStorage.getItem('email');
    this.appointmentSub = this.inventoryService.getAllItems().subscribe(res => {
      this.itemsofInventory = res;

      this.itemsofInventory.forEach(element => {
        console.log(element);
        this.itemsMap.push({
          title: element.name,
          value: element.id
        });
      });


    });
    this.appointmentSub2 = this.managerService.getAppointments().subscribe(res => {
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

    this.estimatesDocs = this.afs.collection("estimate").valueChanges();
    console.log(this.estimatesDocs);
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

  ngOnDestroy() {
    this.appointmentSub.unsubscribe();
    this.appointmentSub2.unsubscribe();
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

  showDetails() {
    console.log("show details about the order");
    this.ongoing_Appointments.forEach(element => {
      if (element['id'] == this.selectedOrder) {
        this.selectedOrderDetails = element;
      }
    });
    this.typesRequiredStringArray = []; //always empty the array otherwise it will show details about past orders

    console.log(this.selectedOrderDetails);
    let types: Array<string> = this.selectedOrderDetails['checkTypes'];
    types.forEach(element => {
      switch (element) {
        case "0":
          this.typesRequiredStringArray.push("Gate");
          break;
        case "1":
          this.typesRequiredStringArray.push("Door");
          break;
        case "2":
          this.typesRequiredStringArray.push("Hand-Rail");
          break;
        case "3":
          this.typesRequiredStringArray.push("Table");
          break;
        case "4":
          this.typesRequiredStringArray.push("Chair");
          break;
        case "5":
          this.typesRequiredStringArray.push("Wall-Art");
          break;
        case "6":
          this.typesRequiredStringArray.push("Window Grill");
          break;
        case "7":
          this.typesRequiredStringArray.push("Other");
          break;
      }
    });
  }



}

export interface Item {
  id: string,
  name: string,
  cost: number,
  des: string,
  quantity: number,
  minQ: number,//the minimum amount that can be in the inventory
}