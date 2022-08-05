import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
myform:any

  constructor(
    private authservice:AuthService,

    ) { }

   
  ngOnInit(): void {
    this.myform =new FormGroup({
      'name':new FormControl( null,Validators.required),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null, Validators.required),
     
    })
  }
  
  registerUser(){
    this.authservice.register(this.myform.value)
    .subscribe(
      (res)=>{
        console.log(res)
      }
    )
  }
  onSubmit(){
    this.registerUser()
    this.myform.reset()
  }

}
