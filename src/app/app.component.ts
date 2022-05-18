import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//  ESTE FRAGMENTO DE CÓDIGO CAMBIA LA PROPIEDAD DEL NAVBAR PRINCIPAL A FIXED.
  //  AHORA MISMO NO ESTA EN USO
export class AppComponent {
  title = 'SW Database';

  navbarfixed:boolean = false;
  @HostListener('window:scroll',['$event']) onscroll(){
    if(window.scrollY > 100){
      this.navbarfixed = true;
    }else{
      this.navbarfixed =false;
    }
  }
}
