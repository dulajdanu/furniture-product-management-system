import { Component, OnInit } from '@angular/core';

import { NbSidebarService, NbToastrService, NbMenuItem } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'ngx-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {


  Mail;
  linearMode = true;

  staffEmail;
  staffPassword;
  staffFullname;
  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private router: Router, private toastrService: NbToastrService, private managerService: ManagerService) {

    this.Mail = localStorage.getItem('email');

  }

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
  ngOnInit(): void {
    // this.getAppointments();
    // this.userService.getAppointments().subscribe().unsubscribe();

  }
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

  ];

  load() {
    console.log('avatar clicled');
    this.authService.SignOut();

  }

  createAccount() {
    console.log('create new worker account');
    this.managerService.createNewStaffAccount(this.staffEmail, this.staffFullname, this.staffPassword);
    this.staffPassword = null;
    this.staffFullname = null;
    this.staffEmail = null;
  }

}

