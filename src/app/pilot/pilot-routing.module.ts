import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  { path: 'pilot', redirectTo: 'pilot/index', pathMatch: 'full'},
  { path: 'pilot/index', component: IndexComponent },
  { path: 'pilot/create', component: CreateComponent },
  { path: 'pilot/edit/:id_pilot', component: EditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PilotRoutingModule { }
