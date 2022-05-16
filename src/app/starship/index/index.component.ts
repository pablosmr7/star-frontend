import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { StarshipService } from '../starship.service';
import { Starship } from '../starship';
import { Pilot } from '../starship';
import { PilotShip } from '../starship';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  starships: Starship[] = [];
  pilotShips: PilotShip[] = [];
  pilots: Pilot[] = [];

  //constructor() { }  //Original
  constructor(public starshipService: StarshipService) { }

  form: FormGroup;


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

      //console.log(this.starships[i].credits % 15);
      //console.log(this.convertBase(this.starships[i].credits,10,15));
      //console.log(this.starships[1].credits/26);
      //console.log(this.starships.filter(item => item.credits));
    })

    this.starshipService.getPilot().subscribe((data: Pilot[])=>{
      this.pilots = data;
    })

    this.starshipService.getPilotShip().subscribe((data: PilotShip[])=>{
      this.pilotShips = data;

    })



    this.form = new FormGroup({
      //phone: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ])
    });
    
  }

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////SUBIDA DE PILOTOSNAVES//////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


submit(){
  console.log(this.form.value);
  this.starshipService.createPilotShip(this.form.value).subscribe(res => {
       alert('Piloto Asignado');

  })
}


//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////BORRA NAVES y PILOTOSNAVES//////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


  deleteStarship(id){
    this.starshipService.delete(id).subscribe(res => {
         this.starships = this.starships.filter(item => item.id !== id);
         alert('La nave ha sido eliminada, almirante.');

    })
  }

  deletePilotship(id){
    this.starshipService.deletePilotShip(id).subscribe(res => {
         this.pilotShips = this.pilotShips.filter(item => item.id !== id);
         alert('El piloto ha sido eliminado, almirante');

    })
  }



/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////FUNCION PARA CAMBIAR A MULTIPLES BASES/////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

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
