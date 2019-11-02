# ngx-moderndatepicker

Angular 6+ Simple and interactive calender datepicker component

## Installation

1. Install package from `npm`.

```sh
npm install ngx-moderndatepicker --save
```

2. Include NgModernDatepickerModule into your application.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModernDatepickerModule } from 'ngx-moderndatepicker';

@NgModule({
  imports: [
    BrowserModule,
    NgModernDatepickerModule
  ],
  declarations: [ AppComponent ],
  exports: [ AppComponent ]
})
export class AppModule {}
```

## Example
```html
  <ngx-moderndatepicker [(ngModel)]="date" />
```

## Additional attributes
|Name|Type|Default|Description|
| --- | --- | --- | --- |
|`headless`|boolean|`false`|Disable datepicker's input|
|`isOpened`|boolean|`false`|Show or hide datepicker|
|`position`|string|`bottom-right`|Dropdown position (`bottom-left`, `bottom-right`, `top-left`, `top-right`)|

## Options
```ts
import { ModernDatePickerOptions } from 'ngx-moderndatepicker';
import * as frLocale from 'date-fns/locale/fr';

options: ModernDatePickerOptions = {
  minYear: 1970,
  maxYear: 2030,
  displayFormat: 'MMM D[,] YYYY',
  barTitleFormat: 'MMMM YYYY',
  dayNamesFormat: 'dd',
  firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
  locale: frLocale,
  minDate: new Date(Date.now()), // Minimal selectable date
  maxDate: new Date(Date.now()),  // Maximal selectable date
  barTitleIfEmpty: 'Click to select a date',
  placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
  addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
  addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
  fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
  useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown
   weekendsDay: [0,6],
   /** Sunday is 0 , Highlights the weekends with gray background**/
  holidayList: [new Date('12/25/2000'), new Date('01/01/2001')]
  /** List of Holidays **/ 
};
```

For available `format` options check out [here](https://date-fns.org/docs/format).

In case you want to initialize with an empty value, just assign null to the model attribute you're storing the date and you can customize the message in the bar with the property `barTitleIfEmpty`.

## Licence

MIT
