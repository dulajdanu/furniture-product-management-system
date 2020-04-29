import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuItem } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private userService: UserService) {
  }

  numberOfOrders: number = 0;
  showRequestForm: boolean = false;

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
  ngOnInit(): void {
    this.getAppointments();

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
      title: 'Change Password',
      icon: 'lock-outline',
    },


  ];

  load() {
    console.log('avatar clicled');
    this.authService.SignOut();

  }

  getAppointments() {

    return this.userService.getAppointments().subscribe(res => {
      console.log(res.length);
      this.numberOfOrders = res.length;
      res.forEach(element => {
        console.log(element.payload.doc.id);
      });

    });
  }
  ngOnDestroy() {
    // ...
    console.log('on destroy called');
    this.userService.getAppointments().subscribe().unsubscribe();
  }

  request() {
    console.log("show the form for the user");
    this.showRequestForm = true;
  }




}
