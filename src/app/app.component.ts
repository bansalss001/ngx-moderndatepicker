import { Component } from '@angular/core';
import * as enLocale from 'date-fns/locale/en';
import { addDays, addYears, subYears, addMonths } from 'date-fns'

import { DatepickerOptions } from 'ngx-moderndatepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-moderndatepicker-library';
   options: DatepickerOptions  = {
    locale: enLocale,
    weekendsDay : [0,6],
    holidayList : [new Date('11/01/2019'),new Date('11/15/2019')],
    minDate : addDays(new Date(),5),
    maxDate : addMonths(new Date(),1),
    displayFormat : 'MM/DD/YYYY'
  };
  date: Date;
  position = 'bottom-left';
  constructor() {
    this.date = new Date();
  }
  ngOnChanges(e){
    console.log(e)
  }
}
