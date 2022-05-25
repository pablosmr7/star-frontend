import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { StarshipService } from '../starship.service';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Pilot, PilotShip, Starship } from '../starship';

//ESTE ES EL COMPONENTE DE LA TARJETA DE DATOS. CADA VEZ QUE SE LLAME, RELLENA LOS DATOS DE UNA NAVE
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  // DECLARACIÓN DE VARIABLES PARA LAS TARJETAS DE DATOS. 
    // INPUT ES PARA RECIBIR DATOS DE UN COMPONENTE PADRE
    // OUTPUT ES PARA MANDAR DATOS A UN COMPONENTE PADRE 

  @Input() starship: Starship;
  @Input() pilots:Pilot[];
  @Output() starshipDeleted= new EventEmitter<number>();

  form: FormGroup;
  pilotShips:PilotShip[];


  constructor(
    public starshipService: StarshipService,
    public fb: FormBuilder
  ) { }


  ////////////////////////AL LLAMAR AL COMPONENTE, SE INICIA ESTO AUTOMATICAMENTE////////////////////////
  //////////////////////////////////////// ¡IMPORTANTE! /////////////////////////////////////////////////
  //AQUI VA EL CONTROL DEL FORMULARIO PARA SUBIR PILOTOS, Y ES DONDE SE ASIGNA AUTO EL this.starship.id//

  ngOnInit(): void {
    //console.log("enganchao mal");
    this.starshipService.getPilotShipbyId(this.starship.id).subscribe((data: PilotShip[])=>{
      this.pilotShips = data;
    });

    this.form = this.fb.group({
      id_pilot:  new FormControl(null, [ Validators.required ]),
      id_starship: new FormControl(this.starship.id, [ Validators.required ])
    });


  }

// METODO SUMBIT PARA LA ASOCIAR PILOTOS A NAVES. LOS ASOCIA, LUEGO LOS MUESTRA, Y SE SUPONE QUE DESPUES AVISA
// AVISA ANTES, MALAJE.
  submit(){
    console.log(this.form.value);
    this.starshipService.createPilotShip(this.form.value).subscribe(res => {

        this.starshipService.getPilotShipbyId(this.starship.id).subscribe((data: PilotShip[])=>{
          this.pilotShips = data;
        });
        
    });
    alert('Piloto Asignado');
  }

/////////////////////////////////////////// ¡IMPORTANTE! /////////////////////////////////////////////////
////////////////////////// METODOS DE BORRADO PARA NAVES Y PARA PILOTOS->NAVE/////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

  //ESTE ES EL MÉTODO QUE BORRA LA NAVE.
  //PRIMERO HACE LA LLAMADA AL SERVICIO DELETE PARA BORRAR LA NAVE DEL BACK LARAVEL
  //DESPUES, EMITE LA RESPUESTA A starship/index.component.ts AL METODO starshipDeleted
  deleteStarship(id){
    this.starshipService.delete(id).subscribe(res => {
      this.starshipDeleted.emit(id);
    });
  }

  deletePilotship(id){
    this.starshipService.deletePilotShip(id).subscribe(res => {
      this.pilotShips = this.pilotShips.filter(item => item.id !== id);
      alert('El piloto ha sido eliminado, almirante');
    });
  }


}
