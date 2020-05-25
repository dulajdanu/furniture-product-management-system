import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'ngx-estimate-cal',
  templateUrl: './estimate-cal.component.html',
  styleUrls: ['./estimate-cal.component.scss']
})
export class EstimateCalComponent implements OnInit {

  selectedOrder: string; //this is sued to refer to the order selected by the manager



  constructor(private sidebarService: NbSidebarService, private authService: AuthService) { }

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
      title: 'Profile',
      icon: 'person-outline',
      link: '/clerk/profile'
    },
    {
      title: 'Estimate Calculator',
      icon: 'pricetags-outline',
      link: '/manager/estimate-calculator'

    },
  ];

}