import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { ClerkService } from '../clerk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

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
      title: 'Upcoming orders',
      icon: 'browser-outline',
    },
    {
      title: 'Inventory',
      icon: 'car-outline',
      link: '/clerk/inventory'

    },


  ];

  ngOnInit(): void {
  }

}
