import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  items = [
    {
      title: 'Logout',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
