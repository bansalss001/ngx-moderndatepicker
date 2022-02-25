import { Component, OnInit, Input, OnChanges, SimpleChanges, HostListener, forwardRef, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR , ControlValueAccessor} from '@angular/forms';
import {
  startOfMonth,
  endOfMonth,
  addMonths,
  setYear,
  eachDay,
  getDate,
  getMonth,
  getYear,
  isToday,
  isSameDay,
  isSameMonth,
  isSameYear,
  format,
  getDay,
  subDays,
  setDay,
  addYears,
  subYears,
  setMonth,
} from 'date-fns';

export type AddClass = string | string[] | { [k: string]: boolean } | null;

export interface ModernDatePickerOptions {
  minYear?: number; // default: current year - 30
  maxYear?: number; // default: current year + 30
  displayFormat?: string; // default: 'MMM D[,] YYYY'
  dayNamesFormat?: string; // default 'ddd'
  monthNamesFormat?: string; // default 'MMM'
  firstCalendarDay?: number; // 0 = Sunday (default), 1 = Monday, ..
  locale?: object;
  minDate?: Date;
  maxDate?: Date;
  /** Placeholder for the input field */
  placeholder?: string;
  /** [ngClass] to add to the input field */
  addClass?: AddClass;
  /** [ngStyle] to add to the input field */
  addStyle?: { [k: string]: any } | null;
  /** ID to assign to the input field */
  fieldId?: string;
  /** If false, barTitleIfEmpty will be disregarded and a date will always be shown. Default: true */
  weekendsDay?: number[];
   /** Sunday is 0 , Highlights the weekends with gray background**/
  holidayList?: Array<Date>;
  /** List of Holidays **/
  views?: Array<'month' | 'date' | 'year'>;
   //its an array of strings which can contain either of the items 'month', 'date' , 'year'
}

// Counter for calculating the auto-incrementing field ID
let counter = 0;

/**
 * Internal library helper that helps to check if value is empty
 * @param value
 */
const isNil = (value: Date | ModernDatePickerOptions) => {
  return (typeof value === 'undefined') || (value === null);
};

@Component({
  selector: 'ngx-moderndatepicker',
  templateUrl: 'ngx-moderndatepicker.component.html',
  styleUrls: ['ngx-moderndatepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgxModerndatepickerComponent), multi: true }
  ]
})
export class NgxModerndatepickerComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() options: ModernDatePickerOptions;

  /**
   * Disable datepicker's input
   */
  @Input() headless = false;

  /**
   * Set datepicker's visibility state
   */
  @Input() isOpened = false;

  /**
   * Datepicker dropdown position
   */
  @Input() position = 'bottom-right';

  private positions = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];

  innerValue: Date;
  displayValue: string;
  displayFormat: string;
  date: Date;
  barTitle: string;
  barTitleFormat: string;
  barTitleIfEmpty: string;
  minYear: number;
  maxYear: number;
  firstCalendarDay: number;
  view: string;
  years: { year: number; isThisYear: boolean }[];
  dayNames: string[];
  monthNames: Array<any>;
  dayNamesFormat: string;
  monthNamesFormat: string;
  days: {
    date: Date;
    day: number;
    month: number;
    year: number;
    inThisMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isSelectable: boolean;
    isWeekend: boolean;
    isHoliday: boolean;
  }[];
  locale: object;
  placeholder: string;
  addClass: AddClass;
  addStyle: { [k: string]: any } | null;
  fieldId: string;
  disabled: boolean;
  useEmptyBarTitle: boolean;
  views: Array<'date' | 'month' | 'year'>;
  selectablesFromPicker: object = {};
  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  get value(): Date {
    return this.innerValue;
  }

  set value(val: Date) {
    this.innerValue = val;
    this.onChangeCallback(this.innerValue);
  }

  constructor() {
  }

  ngOnInit() {
    this.view = 'year';
    if(!this.date) {
      this.date = new Date();
    }
    this.setOptions();
    this.initDayNames();
    this.initYears();
    this.initMonthName();
    this.init();
    for(let i in this.views) {
        this.selectablesFromPicker[this.views[i]] = true;
    }
    // Check if 'position' property is correct
    if (this.positions.indexOf(this.position) === -1) {
      throw new TypeError(`ng-moderndatepicker: invalid position property value '${this.position}' (expected: ${this.positions.join(', ')})`);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
      this.setOptions();
      this.initDayNames();
      this.init();
      this.initYears();
      this.initMonthName();
  }

  get defaultFieldId(): string {
    // Only evaluate and increment if required
    const value = `datepicker-${counter++}`;
    Object.defineProperty(this, 'defaultFieldId', {value});

    return value;
  }

  setOptions(): void {
    const today = new Date(); // this const was added because during my tests, I noticed that at this level this.date is undefined
    this.minYear = this.options && this.options.minYear || getYear(today) - 30;
    this.maxYear = this.options && this.options.maxYear || getYear(today) + 30;
    this.displayFormat = this.options && this.options.displayFormat || 'MMM D[,] YYYY';
    this.barTitleFormat = 'YYYY';
    this.dayNamesFormat = this.options && this.options.dayNamesFormat || 'ddd';
    this.monthNamesFormat = this.options && this.options.monthNamesFormat || 'MMM';
    this.barTitleIfEmpty = (new Date().getFullYear()).toString();
    this.firstCalendarDay = this.options && this.options.firstCalendarDay || 0;
    this.locale = this.options && { locale: this.options.locale } || {};
    this.placeholder = this.options && this.options.placeholder || '';
    this.addClass = this.options && this.options.addClass || {};
    this.addStyle = this.options && this.options.addStyle || {};
    this.fieldId = this.options && this.options.fieldId || this.defaultFieldId;
    this.views = this.options && this.options && this.options.views && this.options.views.length && this.options.views || ['month', 'date', 'year']; 
  }

  nextYear(): void {
      this.date = addYears(this.date, 1);
      this.barTitle = format(this.date, this.barTitleFormat, this.locale);
      this.init();
      this.initMonthName();
  }

  prevYear(): void {
      this.date = subYears(this.date, 1);
      this.barTitle = format(this.date, this.barTitleFormat, this.locale);
      this.init();
      this.initMonthName();
  }

  setDate(i: number): void {
    this.date = this.days[i].date;
    this.value = this.date;
    this.init();
    this.close();
  }

  setYear(i: number): void {
    this.date = setYear(this.date, this.years[i].year); // getting the last of the selected month of the given year
    if(!this.selectablesFromPicker['date'] && !this.selectablesFromPicker['month']) {
      this.initMonthName();
      this.view = 'year';
      this.value = this.date;
      this.init();
      this.close()
    } else {
      this.init();
      this.initMonthName();
      this.view = 'year';
    }
   
  }

  selectMonth(i: number): void {
    this.date = setMonth(this.date,i);
    if(!this.selectablesFromPicker['date']) {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0); // getting the last of the selected month of the given year
      this.initMonthName();
      this.view = 'year';
      this.value = this.date;
      this.init();
      this.close()
    } else {
      this.init();
      this.initMonthName();
      this.view = 'year';
    }
  }
  /**
   * Checks if specified date is in range of min and max dates
   * @param date
   */
  private isDateSelectable(date: Date): boolean {
    if (isNil(this.options)) {
      return true;
    }

    const minDateSet = !isNil(this.options.minDate);
    const maxDateSet = !isNil(this.options.maxDate);

    const timestamp = date.valueOf();

    if (minDateSet && (timestamp < this.options.minDate.valueOf())) {
      return false;
    }

    if (maxDateSet && (timestamp > this.options.maxDate.valueOf())) {
      return false;
    }

    return true;
  }

  private isWeekendDay (date: Date): boolean {
    const weekendsDay = Array.isArray(this.options.weekendsDay);
    if(weekendsDay) {
      return this.options.weekendsDay.indexOf(getDay(date)) != -1 ? true : false;
    }

    return false;
  }

  private isHoliday (date: Date): boolean {
    const areHolidays = Array.isArray(this.options.holidayList);
    if(areHolidays) {
      return (this.options.holidayList.filter((day)=> isSameDay(day,date))).length ? true : false;
    }

    return false;
  }

  init(): void {
    // this.date may be null after .reset(); fall back to current date.
    const actualDate = this.date || new Date();
    const start = startOfMonth(actualDate);
    const end = endOfMonth(actualDate);

    this.days = eachDay(start, end).map(date => {
      return {
        date: date,
        day: getDate(date),
        month: getMonth(date),
        year: getYear(date),
        inThisMonth: true,
        isToday: isToday(date),
        isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue),
        isSelectable: this.isDateSelectable(date),
        isWeekend: this.isWeekendDay(date),
        isHoliday: this.isHoliday(date)
      };
    });

    const tmp = getDay(start) - this.firstCalendarDay;
    const prevDays = tmp < 0 ? 7 - this.firstCalendarDay : tmp;

    for (let i = 1; i <= prevDays; i++) {
      const date = subDays(start, i);
      this.days.unshift({
        date: date,
        day: getDate(date),
        month: getMonth(date),
        year: getYear(date),
        inThisMonth: false,
        isToday: isToday(date),
        isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue),
        isSelectable: this.isDateSelectable(date),
        isWeekend : this.isWeekendDay(date),
        isHoliday: this.isHoliday(date)
      });
    }

    if (this.innerValue) {
      this.displayValue = format(this.innerValue, this.displayFormat, this.locale);
      this.barTitle = format(start, this.barTitleFormat, this.locale);
    } else {
      this.displayValue = '';
      this.barTitle = this.useEmptyBarTitle ? this.barTitleIfEmpty : format(this.date, this.barTitleFormat, this.locale);
    }
  }

  initYears(): void {
    const range = this.maxYear - this.minYear;
    this.years = Array.from(new Array(range), (x, i) => i + this.minYear).map(year => {
      return {
        year: year,
        isThisYear: year === getYear(this.date),
        isToday : year === getYear(new Date()),
        isSelectable: this.isYearSelectable(year)
        };
    });
  }

  private isYearSelectable(date: any) : boolean {
     const minDate = isNil(this.options.minDate) ? false : this.options.minDate;
     const maxDate = isNil(this.options.maxDate) ? false : this.options.maxDate;

     if ( minDate && maxDate ) {
       return minDate.getFullYear() <= date && date <= maxDate.getFullYear();
     } else if (minDate) {
       return  minDate.getFullYear() <= date;
     } else if (maxDate) {
        return  date <= maxDate.getFullYear();
     }
     return true;
  }

  initDayNames(): void {
    this.dayNames = [];
    const start = this.firstCalendarDay;
    for (let i = start; i <= 6 + start; i++) {
      const date = setDay(new Date(), i);
      this.dayNames.push(format(date, this.dayNamesFormat, this.locale));
    }
  }

  initMonthName(): void {
    let monthNames = [];
    const actualDate = this.date || new Date();
    let currentDate = new Date(actualDate);
    const start = subYears(currentDate.setMonth(11),1);
    for (let i = 1; i <= 12 ; i++) {
      const date = addMonths(start, i);
      monthNames.push({
        name: format(date, this.monthNamesFormat, this.locale),
        isSelected: date.getMonth() === actualDate.getMonth(),
        isThisMonth: isSameMonth(date,new Date()) && isSameYear(actualDate,new Date()),
        isSelectable: this.isMonthSelectable(date)
      });
    }
    this.monthNames = monthNames;
  }

  private isMonthSelectable(date: Date): boolean {

      const minDate = isNil(this.options.minDate) ? false : this.options.minDate;
      const maxDate = isNil(this.options.maxDate) ? false : this.options.maxDate;

      if ( minDate && maxDate ) {
        if(minDate.getFullYear() < date.getFullYear() && date.getFullYear() < maxDate.getFullYear()){
            return true;
        } else if (minDate.getFullYear() < date.getFullYear() && date.getFullYear() == maxDate.getFullYear()){
            if(date.getMonth() <= maxDate.getMonth()){
              return true;
            } else { return false;}
        } else if (minDate.getFullYear() == date.getFullYear() && date.getFullYear() < maxDate.getFullYear()){
            if(minDate.getMonth() <= date.getMonth()){
              return true;
            } else { return false;}
        } else if (minDate.getFullYear() == date.getFullYear() && date.getFullYear() == maxDate.getFullYear()){
            if(minDate.getMonth() <= date.getMonth() && date.getMonth() <= maxDate.getMonth()){
              return true;
            } else { return false;}
        } else {
             return false;
        }
      } else if (minDate) {
        if(minDate.getFullYear() < date.getFullYear()){
            return true;
        } else if (minDate.getFullYear() == date.getFullYear()){
            if(minDate.getMonth() <= date.getMonth()){
              return true;
            } else { return false;}
        } else {
             return false;
        }
      } else if (maxDate) {
         if(date.getFullYear() < maxDate.getFullYear()){
             return true;
         } else if (date.getFullYear() == maxDate.getFullYear()){
             if(date.getMonth() <= maxDate.getMonth()){
               return true;
             } else { return false;}
         } else {
              return false;
         }
      }

    return true;
  }

  toggleView(): void {
    this.view = this.view === 'year' ? 'years' : 'year';
  }

  toggle(): void {
    this.isOpened = !this.isOpened;

    if (!this.isOpened && this.view === 'years') {
      this.toggleView();
    }
  }

  close(): void {
    this.isOpened = false;

    if (this.view === 'years') {
      this.toggleView();
    }
  }

  reset(fireValueChangeEvent = false): void {
    this.date = null;
    this.innerValue = null;
    this.init();
    this.initMonthName();
    if (fireValueChangeEvent && this.onChangeCallback) {
      this.onChangeCallback(this.innerValue);
    }
  }

  writeValue(val: Date) {
    if (val) {
      this.date = val;
      this.innerValue = val;
      this.init();
      this.initMonthName();
      this.displayValue = format(this.innerValue, this.displayFormat, this.locale);
      this.barTitle = format(startOfMonth(val), this.barTitleFormat, this.locale);
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  @HostListener('document:click', ['$event']) onBlur(e: MouseEvent) {
    if (!this.isOpened) {
      return;
    }
    const input = document.querySelector('.ngx-moderndatepicker-input');

    if (input == null) {
      return;
    }

    if (e.target === input || input.contains(<any>e.target)) {
      return;
    }
    const container = document.querySelector('.ngx-moderndatepicker-calendar-container');
    if (container && container !== e.target && !container.contains(<any>e.target) && !(<any>e.target).classList.contains('year-unit') && !(<any>e.target).classList.contains('month-unit')) {
      this.close();
    }
  }
}
