import { Component, OnInit } from '@angular/core';

import { PilotService } from '../pilot.service';
import { Pilot } from '../pilot';

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
      console.log(this.pilots);
    })
  }


  
  deletePilot(id){
    this.pilotService.delete(id).subscribe(res => {
         this.pilots = this.pilots.filter(item => item.id !== id);
         console.log('El piloto ha sido eliminado, almirante.');
    })
  }


}
