import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { StarshipService } from '../starship.service';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Pilot, PilotShip, Starship } from '../starship';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

  @Input() starship: Starship;

  @Output() starshipDeleted= new EventEmitter<number>();


  form: FormGroup;
  pilotShips:PilotShip[];
  @Input() pilots:Pilot[];




  constructor(
    public starshipService: StarshipService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log("enganchao mal");

    this.starshipService.getPilotShipbyId(this.starship.id).subscribe((data: PilotShip[])=>{
      this.pilotShips = data;
    });




    this.form = this.fb.group({
      id_pilot:  new FormControl(null, [ Validators.required ]),
      id_starship: new FormControl(this.starship.id, [ Validators.required ])
    });


  }


  submit(){
    console.log(this.form.value);
    this.starshipService.createPilotShip(this.form.value).subscribe(res => {
        alert('Piloto Asignado');
        this.starshipService.getPilotShipbyId(this.starship.id).subscribe((data: PilotShip[])=>{
          this.pilotShips = data;
        });
        
    });
  }


  
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
