import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbToastrService, NbMenuItem } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { ClerkService } from '../clerk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  ngOnInit(): void {
  }


  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private clerkService: ClerkService, private router: Router, private toastrService: NbToastrService) { }

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

  data = [
    {
      id: 1,
      name: "Leanne Graham",
      cost: "20",
    },
    {
      id: 2,
      name: "Ervin Howell",
      cost: "20",
    },

    // ... list of items

    {
      id: 11,
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      cost: "20",
    }
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
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'Item ID'
      },
      name: {
        title: 'Item Name'
      },

      cost: {
        title: 'Item Cost'
      }
    }
  }

};




