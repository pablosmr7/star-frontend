import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarshipRoutingModule } from './starship-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from './card/card.component';
import { ReportComponent } from './report/report.component';


//AQUI HAY QUE DECLARAR LOS COMPONENTES CREADOS PARA QUE SE PUEDAN UTILIZAR
@NgModule({
  declarations: [
    IndexComponent, 
    CreateComponent,
    EditComponent, 
    CardComponent, ReportComponent
  ],
  imports: [
    CommonModule,
    StarshipRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
  ]
})

export class StarshipModule { }
//export class AngularMaterialModule { }
 