import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-ongoing-orders',
  templateUrl: './ongoing-orders.component.html',
  styleUrls: ['./ongoing-orders.component.scss']
})
export class OngoingOrdersComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private router: Router, private toastrService: NbToastrService) { }

  load() {
    console.log('avatar clicled');
    this.authService.SignOut();

  }

  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      home: true,
      link: '/user/home',

    },
    {
      title: 'Profile',
      icon: 'person-outline',
      link: '/user/profile'
    },
    {
      title: 'Ongoing orders',
      icon: 'browser-outline',
      link: '/user/ongoing-orders'
    },



  ];




  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  ngOnInit(): void {
  }

}
