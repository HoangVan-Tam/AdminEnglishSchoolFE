import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TitlePageComponent } from './title-page.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [TitlePageComponent],
  imports: [
    FormsModule,
    CommonModule,
  ],
  exports:[
      TitlePageComponent,
      HttpClientModule,
  ]
})
export class TitlePageModule { }
