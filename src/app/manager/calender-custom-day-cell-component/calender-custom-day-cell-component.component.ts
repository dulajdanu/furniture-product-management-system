import { Component, OnInit } from '@angular/core';
import { NbCalendarDayCellComponent } from '@nebular/theme';


@Component({
  selector: 'ngx-calender-custom-day-cell-component',
  template: `
    <div class="cell-content">
      <div>{{ day }}</div>
      <span class="caption" [class.text-control]="selected">{{ (day + 100) * day }}$</span>
    </div>
  `,
  styles: [`
  .cell-content {
    flex-direction: column;
  }
`],
})
export class CalenderCustomDayCellComponentComponent extends NbCalendarDayCellComponent<Date> {



}
