import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { ClerkService } from '../clerk.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-ongoing-orders',
  templateUrl: './ongoing-orders.component.html',
  styleUrls: ['./ongoing-orders.component.scss']
})
export class OngoingOrdersComponent implements OnInit {
  Mail;

  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private clerkService: ClerkService, private router: Router, private toastrService: NbToastrService) {
    this.Mail = localStorage.getItem('email');
  }

  load() {
    console.log('avatar clicled');
    this.authService.SignOut();

  }


  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      home: true,
      link: '/clerk/home',

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



  ngOnInit(): void {
  }

}
