import { Component, OnInit } from '@angular/core';

import { StarshipService } from '../starship.service';
import { Starship } from '../starship';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  starships: Starship[] = [];

  //constructor() { }  //Original
  constructor(public starshipService: StarshipService) { }

  ngOnInit(): void {
    this.starshipService.getAll().subscribe((data: Starship[])=>{
      this.starships = data;

      for (let i = 0; i < data.length; i++) {

        if(this.starships[i].credits!=NaN){
          console.log(this.starships[i].credits % 15);
        }

      };

      //console.log(this.starships[1].credits/26);
      console.log(this.starships.filter(item => item.credits));
    })
  }

  deleteStarship(id){
    this.starshipService.delete(id).subscribe(res => {
         this.starships = this.starships.filter(item => item.id !== id);
         alert('La nave ha sido eliminada, almirante.');
    })
  }

}


