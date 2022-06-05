import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';


const routes: Routes = [

  {path: '', component: PublicComponent,
    children: [
      {path:'', component: HomeComponent},
      {path:'login', component: LoginComponent}
    ]},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
