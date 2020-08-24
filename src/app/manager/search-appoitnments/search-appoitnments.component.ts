import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuItem, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { AuthService } from '../../auth/auth.service';
import { NbSearchService } from '@nebular/theme';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'ngx-search-appoitnments',
  templateUrl: './search-appoitnments.component.html',
  styleUrls: ['./search-appoitnments.component.scss']
})
export class SearchAppoitnmentsComponent implements OnInit {


  Mail;
  linearMode = true;
  value = '';

  appointmentData;


  showToast(status: NbComponentStatus, message: string) { //function used to show toast messages
    this.toastrService.show(status, message, { status });
  }

  constructor(private sidebarService: NbSidebarService, private authService: AuthService, private searchService: NbSearchService, private afs: AngularFirestore, private toastrService: NbToastrService) {
    this.Mail = localStorage.getItem('email');

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.appointmentData = null;
        this.value = data.term;

        console.log(this.value);
        this.afs.collection("appointments").doc(this.value).get().subscribe(res => {
          if (res.exists) {
            console.log("appointment exist under this name");
            // this.appointmentData = res;
            // console.log(this.appointmentData);]
            this.afs.collection("appointments").doc(this.value).valueChanges().subscribe(res => {
              this.appointmentData = res;
              console.log(this.appointmentData);

            });

          } else {
            console.log("No appointment found");
            this.showToast('danger', "No appointment found");


          }
        })

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
