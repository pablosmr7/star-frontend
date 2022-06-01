import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StarshipModule } from './starship/starship.module';
import { PilotModule } from './pilot/pilot.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SecureComponent } from './secure/secure.component';

import { PublicModule } from './public/public.module';

@NgModule({
  declarations: [
    AppComponent,
    SecureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StarshipModule,
    PilotModule,
    HttpClientModule,
    PublicModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
