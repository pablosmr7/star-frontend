import { Component, OnInit } from '@angular/core';

import { StarshipService } from '../starship.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Starship } from '../starship';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  id: number;
  starship: Starship;
  form: FormGroup;

  constructor(
    public starshipService: StarshipService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id_pilot'];
    this.starshipService.find(this.id).subscribe((data: Starship)=>{
      this.starship = data;
    });

    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ0-9 \-\']+') ]),
      credits: new FormControl('', [ Validators.pattern("^[0-9]*$") ]),
      model: new FormControl('', [ Validators.required ]),
      manufacturer: new FormControl('', [ Validators.required ])
      //phone: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ])
    });

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.starshipService.update(this.id, this.form.value).subscribe(res => {
         console.log('La nave ha sido actualizada');
         this.router.navigateByUrl('starship/index');
    })
  }

}
