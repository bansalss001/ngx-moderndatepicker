import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxModerndatepickerModule } from '../ngx-moderndatepicker/module/ngx-moderndatepicker.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxModerndatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
