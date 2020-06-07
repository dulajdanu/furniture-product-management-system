import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService) {
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
  ngOnInit(): void {
  }
  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      home: true,
      link: '/user/home'
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



}
