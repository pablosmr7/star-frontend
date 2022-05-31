import { Component, OnInit } from '@angular/core';

import { StarshipService } from '../starship.service';
import { Starship } from '../starship';
import { Pilot } from '../starship';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  starships: Starship[]=[];
  pilots: Pilot[] = [];

  constructor(public starshipService: StarshipService) { }

  ngOnInit(): void {
    this.starshipService.getAll().subscribe((data: Starship[])=>{
      this.starships = data;

      for (let i = 0; i < data.length; i++) {
        if(this.starships[i].credits != null){
          this.starships[i].credits = this.convertBase(this.starships[i].credits,10,15);
        } else{
          this.starships[i].credits ='Clasificado';
        }
      };
    });

    this.starshipService.getPilot().subscribe((data: Pilot[])=>{
      this.pilots = data;
    });
  }

  

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


  
  convertBase(value, from_base, to_base) {
    var range = '0123456789\u00DF\u00DE\u00A2\u00B5\u00B6+/'.split('');
    var from_range = range.slice(0, from_base);
    var to_range = range.slice(0, to_base);

    var dec_value = value.split('').reverse().reduce(function (carry, digit, index) {
      if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `'+digit+'` for base '+from_base+'.');
      return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
    }, 0);
    
    var new_value = '';
    while (dec_value > 0) {
      new_value = to_range[dec_value % to_base] + new_value;
      dec_value = (dec_value - (dec_value % to_base)) / to_base;
    }
    return new_value || '0';
  }

}
