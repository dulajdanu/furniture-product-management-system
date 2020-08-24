import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuItem } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'ngx-search-appoitnments',
  templateUrl: './search-appoitnments.component.html',
  styleUrls: ['./search-appoitnments.component.scss']
})
export class SearchAppoitnmentsComponent implements OnInit {


  Mail;
  linearMode = true;
  value = '';

  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private searchService: NbSearchService) {
    this.Mail = localStorage.getItem('email');

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;

        console.log(this.value);

      })

  }


  toggleLinearMode() {
    this.linearMode = !this.linearMode;
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
    {
      title: 'Search Appointments',
      icon: 'search-outline',
      link: '/manager/search'

    },

  ];

  load() {
    console.log('avatar clicled');
    this.authService.SignOut();

  }


}
