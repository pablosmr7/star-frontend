import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarshipRoutingModule } from './starship-routing.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    StarshipRoutingModule
  ]
})
export class StarshipModule { }
