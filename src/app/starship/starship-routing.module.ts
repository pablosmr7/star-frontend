import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ReportComponent } from './report/report.component';


//ARCHIVO DE RUTAS DE ANGULAR. SI SE HACE UNA PAGINA NUEVA, SE DEBE AÑADIR A Routes
const routes: Routes = [
  { path: 'starship', redirectTo: 'starship/index', pathMatch: 'full'},
  { path: 'starship/index', component: IndexComponent },
  { path: 'starship/create', component: CreateComponent },
  { path: 'starship/edit/:id_pilot', component: EditComponent },
  { path: 'starship/report', component: ReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarshipRoutingModule { }
