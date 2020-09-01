import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../../auth/auth.service';
import { ClerkService } from '../../clerk.service';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { Observable, Subscription } from 'rxjs';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'ngx-remove-stock',
  templateUrl: './remove-stock.component.html',
  styleUrls: ['./remove-stock.component.scss']
})
export class RemoveStockComponent implements OnInit {

  source: LocalDataSource;
  appointments;
  currentAppointments;
  selectedOrderId;
  clerkMail;

  inventorySub: Subscription;
  currentAppointmentSub: Subscription;
  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private clerkService: ClerkService, private router: Router, private toastrService: NbToastrService, private inventoryService: InventoryService) {
    this.clerkMail = localStorage.getItem('email');
    this.inventorySub = this.inventoryService.getAllItems().subscribe(res => {
      this.itemsofInventory = res;

      this.itemsofInventory.forEach(element => {
        console.log(element);
        this.itemsMap.push({
          title: element.name,
          value: element.id
        });
      });


    });


    console.log(this.itemsMap);
    this.source = new LocalDataSource(this.itemsAdded);

    this.currentAppointmentSub = this.clerkService.getCurrentAppointments().subscribe(res => {
      this.appointments = res;

      if (res.length == 0) {

      }
      else {
        this.currentAppointments = [];
        this.appointments.forEach(element => {
          if (element['status'] == 5) {
            this.currentAppointments.push(element['id']);
          }
        });
        console.log(this.currentAppointments);
      }

    })
  }

  ngOnDestroy() {
    this.inventorySub.unsubscribe();
    this.currentAppointmentSub.unsubscribe();
  }

  itemsAdded = []; //items added by user to add to stock

  itemsObservable: Observable<Item[]>;
  itemsofInventory: Item[];
  itemsMap: { value: string, title: string }[] = []; //this is used to create the dropdown in the table


  itemId: string = '';
  itemName: string = '';
  itemQty: number = 0;

  headers = ["ID", "Name", "Quantity", "OrderID"];

  rows = [

  ];

  ngOnInit(): void {

  }

  load() {
    console.log('avatar clicled');
    this.authService.SignOut();

  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
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

    }
  }


  settings2 = { //this is for the new items table
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

    }
  }
  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      home: true,
      link: '/clerk/home',

    },

    {
      title: 'Inventory',
      icon: 'car-outline',
      link: '/clerk/inventory'

    },


  ];


  onUserRowSelect(event): void {
    // console.log(this.itemsAdded);
    // console.log(event);
    this.rows.push({
      'ID': event.data.id,
      'Name': event.data.name,
      'Quantity': event.data.quantity,
    });
  }

  RemoveItem() { //this function is used to add items temporaray to a list
    // console.log(this.itemId);
    // console.log(this.itemName);
    // console.log(this.itemQty);
    this.rows.push({
      'ID': this.itemId,
      // 'Name': this.itemName,
      'Quantity': Number(this.itemQty),
      'OrderID': this.selectedOrderId
    });

    // this.itemName = "";
    this.itemId = "";
    this.itemQty = 0;
    this.selectedOrderId = null;

  }

  RemoveAllitemsToStock() { //this function is used to add all the items in the list to the database
    console.log('add all items to stock');
    this.inventoryService.removeStock(this.rows);
    // this.itemName = "";
    this.itemId = "";
    this.itemQty = 0;
    this.rows = [];
    this.selectedOrderId = null;
  }

  Re





}


export interface Item {
  id: string,
  name: string,
  cost: number,
  des: string,
  quantity: number,
  minQ: number,//the minimum amount that can be in the inventory
}