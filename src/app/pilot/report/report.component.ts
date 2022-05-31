import { Component, OnInit } from '@angular/core';

import { PilotService } from '../pilot.service';
import { Pilot } from '../pilot';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

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


  
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      var imgData = canvas.toDataURL('image/png');
      var imgWidth = 210; 
      var pageHeight = 290;  
      var imgHeight = canvas.height * imgWidth / canvas.width-10;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 5; // give some top padding to first page
      
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= -1) {
        position = heightLeft+10 - imgHeight; // top padding for other pages
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save( 'Informe Pilotos.pdf');
    });

  }

}
