import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbToastrService, NbMenuItem } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { ClerkService } from '../clerk.service';
import { Router } from '@angular/router';
import { InventoryService } from './inventory.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  itemsObservable: Observable<Item[]>;
  itemsofInventory: Item[];
  clerkMail: string;




  ngOnInit(): void {
  }


  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private clerkService: ClerkService, private router: Router, private toastrService: NbToastrService, private inventoryService: InventoryService) {
    this.clerkMail = localStorage.getItem('email');
    this.inventoryService.getAllItems().subscribe(res => {
      this.itemsofInventory = res;

    });
  }

  load() {
    console.log('avatar clicled');
    this.authService.SignOut();

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
        title: 'Item Name'
      },

      cost: {
        title: 'Unit Cost'
      },
      des: {
        title: 'Item Description'
      }, quantity: {
        title: 'Item Quantity'
      },
      minQ: {
        title: 'Item Min Quantity'
      }
    }
  }

  loadAddStock() {
    this.router.navigateByUrl("/clerk/add-stock");
  }

  loadRemoveStock() {
    this.router.navigateByUrl("/clerk/remove-stock");
  }




  addRecord(event) {
    var data = {
      "id": event.newData.id,
      "name": event.newData.name,
      "cost": Number(event.newData.cost),
      "des": event.newData.des,
      "quantity": Number(event.newData.quantity),
      "minQ": Number(event.newData.minQ)
    };

    console.log(data);
    this.inventoryService.addItem(data, this.clerkMail);

  }

  updateRecord(event) {
    var data = {
      "id": event.newData.id,
      "name": event.newData.name,
      "cost": Number(event.newData.cost),
      "des": event.newData.des,
      "quantity": Number(event.newData.quantity),
      "minQ": Number(event.newData.minQ)
    };

    console.log(data);
    this.inventoryService.editItem(data);

  }



  deleteRecord(event) {
    console.log(event.data.id);
    this.inventoryService.delteItem(event.data.id);


  }




};

export interface Item {
  id: string,
  name: string,
  cost: number,
  des: string,
  quantity: number,
  minQ: number,//the minimum amount that can be in the inventory
}



