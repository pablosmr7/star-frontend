import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService:AuthService,
    private router:Router,
    private storage:LocalStorageService
    ) { }

  ngOnInit(): void {
    this.form =this.fb.group({
      email:'',
      password:''
    });
  }

  submit(){
    const formData =this.form.value;



    this.authService.login(formData).subscribe(
      result=>{
        this.storage.set('token',result.token);
        this.router.navigateByUrl('starship/index');
      },
      error=>{
        alert("esto esta mal");
        console.log('error');
        console.log(error);
      }
    )
  }

}
