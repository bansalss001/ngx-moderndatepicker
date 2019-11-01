import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { NgxModerndatepickerComponent } from './ngx-moderndatepicker.component';


@NgModule({
  declarations: [NgxModerndatepickerComponent],
  imports: [
   CommonModule,
   BrowserModule,
   FormsModule
  ],
  exports: [NgxModerndatepickerComponent]
})
export class NgxModerndatepickerModule { }
