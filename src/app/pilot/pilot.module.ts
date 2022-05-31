import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PilotRoutingModule } from './pilot-routing.module';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { jsPDF } from 'jspdf';
import * as html2canvas from 'html2canvas';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    PilotRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PilotModule { }
