import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AutofillValueAccessorDirective } from './directives/form-validator';


@NgModule({
  declarations: [
    AppComponent,
    AutofillValueAccessorDirective
  ],
  imports: [
    BrowserModule,
    AutofillValueAccessorDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
