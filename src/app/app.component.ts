import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
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
