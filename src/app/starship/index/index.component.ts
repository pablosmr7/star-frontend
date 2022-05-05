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
      console.log(this.starships);
    })
  }

  deleteStarship(id){
    this.starshipService.delete(id).subscribe(res => {
         this.starships = this.starships.filter(item => item.id !== id);
         console.log('La nave ha sido eliminada, almirante.');
    })
  }

}
