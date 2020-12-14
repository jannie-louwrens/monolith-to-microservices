import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MyFontAwesomeModule } from './my-font-awesome.module';

//https://levelup.gitconnected.com/a-complete-guide-to-angular-modules-faf5a85e3e60

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    MyFontAwesomeModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MyFontAwesomeModule
  ]
})
export class SharedModule { }
