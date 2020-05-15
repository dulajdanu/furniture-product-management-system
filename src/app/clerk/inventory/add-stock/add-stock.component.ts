import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../../auth/auth.service';
import { ClerkService } from '../../clerk.service';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private clerkService: ClerkService, private router: Router, private toastrService: NbToastrService, private inventoryService: InventoryService) {
    this.inventoryService.getAllItems().subscribe(res => {
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
  }

  itemsAdded = []; //items added by user to add to stock
  itemsObservable: Observable<Item[]>;
  itemsofInventory: Item[];
  itemsMap: { value: string, title: string }[] = []; //this is used to create the dropdown in the table

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
  settings = {
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
      title: 'Profile',
      icon: 'person-outline',
      link: '/clerk/profile'
    },
    {
      title: 'Ongoing orders',
      icon: 'browser-outline',
      link: '/clerk/ongoing-orders'
    },
    {
      title: 'Inventory',
      icon: 'car-outline',
      link: '/clerk/inventory'

    },


  ];

  addRecord(event) {
    var data = {
      "id": event.newData.id,
      "name": event.newData.name,
      "cost": event.newData.cost,
      "des": event.newData.des,
      "quantity": event.newData.des,
      "minQ": event.newData.minQ
    };

    console.log(data);
    this.inventoryService.addItem(data);

  }

  updateRecord(event) {
    var data = {
      "id": event.newData.id,
      "name": event.newData.name,
      "cost": event.newData.cost,
      "des": event.newData.des,
      "quantity": event.newData.des,
      "minQ": event.newData.minQ
    };

    console.log(data);
    this.inventoryService.editItem(data);

  }



  deleteRecord(event) {
    console.log(event.data.id);
    this.inventoryService.delteItem(event.data.id);


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