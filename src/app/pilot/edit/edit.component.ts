import { Component, OnInit } from '@angular/core';

import { PilotService } from '../pilot.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Pilot } from '../pilot';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  id: number;
  pilot: Pilot;
  form: FormGroup;

  constructor(    
    public pilotService: PilotService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id_pilot'];
    this.pilotService.find(this.id).subscribe((data: Pilot)=>{
      this.pilot = data;
    });

    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ0-9 \-\']+') ]),
      birth_year: new FormControl('', [ Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ0-9 \-\']+') ]),
      gender: new FormControl('', [ Validators.pattern('^[a-zA-Z]+') ])
      //phone: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ])
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.pilotService.update(this.id, this.form.value).subscribe(res => {
         console.log('Piloto actualizado');
         this.router.navigateByUrl('pilot/index');
    })
  }

  
}


