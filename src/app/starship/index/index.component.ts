import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { StarshipService } from '../starship.service';
import { Starship } from '../starship';
import { Pilot } from '../starship';

//DECLARO COMPONENTE INDICE PARA STARSHIPS, DESDE AQUI SE VE TODO
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  //GENERACION DE VARIABLES PARA CAPTAR OBJETOS DE TIPO STARSHIP Y PILOT
  starships: Starship[] = [];
  pilots: Pilot[] = [];


  constructor(public starshipService: StarshipService, public fb: FormBuilder) { }

  //ESTE CODIGO SE REALIZA INMEDIATAMENTE NADA MAS CARGARSE EL COMPONENTE
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

//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////BORRA NAVES y PILOTOSNAVES/////////////////////////////////
/////////////////DEBIDO A LA CONSTRUCCION DE LA PAGINA, ESTA FUNCION ESTA/////////////////
//DIVIDIDA AQUI Y EN (starship/card.component.ts) PARA VER COMO COMIENZA, MIRA ESE ARCHIVO
//PRIMERO///////////////////////////////////////////////////////////////////////////////// 

starshipDeleted(id:number){
  this.starships = this.starships.filter(item => item.id !== id);
  alert('La nave ha sido eliminada, almirante.');

}

/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////FUNCION PARA CAMBIAR A MULTIPLES BASES/////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

//ESTA FUNCION PERMITE CAMBIAR UN VALOR DE CUALQUIER BASE A CUALQUIER OTRA VASE SIEMPRE QUE SE ENCUENTRE
//DENTRO DE NUESTRA var range

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
