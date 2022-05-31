import { Component, OnInit } from '@angular/core';

import { PilotService } from '../pilot.service';
import { Pilot } from '../pilot';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  pilots: Pilot[]=[];

  constructor(public pilotService: PilotService) { }


  ngOnInit(): void {
    this.pilotService.getAll().subscribe((data: Pilot[])=>{
      this.pilots = data;

      for (let i = 0; i < data.length; i++) {

        if(this.pilots[i].birth_year == 'unknown'){
          this.pilots[i].birth_year ='Desconocido'
        };

        if(this.pilots[i].gender == 'male'){
          this.pilots[i].gender ='Masculino'
        };

        if(this.pilots[i].gender == 'female'){
          this.pilots[i].gender ='Femenino'
        };

      };

    })
  };



  deletePilot(id){
    this.pilotService.delete(id).subscribe(res => {
         this.pilots = this.pilots.filter(item => item.id !== id);
         console.log('El piloto ha sido eliminado, almirante.');
    })
  };


  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }


}
