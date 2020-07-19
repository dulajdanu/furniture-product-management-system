import { Component, OnInit, ɵConsole } from '@angular/core';
import { NbCalendarDayCellComponent, NbDateService } from '@nebular/theme';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'ngx-calender-custom-day-cell-component',
  templateUrl: './calender-custom-day-cell-component.component.html',
  styles: [`
  .cell-content {
    flex-direction: column;
  }
`],
})
export class CalenderCustomDayCellComponentComponent extends NbCalendarDayCellComponent<Date>{
  constructor(dateService: NbDateService<Date>, private afs: AngularFirestore) {
    super(dateService);
    console.log("inside child constructor");
  }

  x = 0;
  showVal: boolean = true;

  ngOnInit() {
    this.afs.collection("managers").doc(localStorage.getItem("email")).collection("appointments", ref => ref.where('date', '==', this.date)).valueChanges().subscribe(data => {
      // console.log(data);
      // this.x = data.length;
      if (data.length != 0) {
        console.log("there is a matching doc");
        this.showVal = false;
        this.x = data.length;

        // console.log(this.x);
        this.showVal = true;

      }
      console.log(data.length);

    });
    // console.log(this.date);

  }










}
