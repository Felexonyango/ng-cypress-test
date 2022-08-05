import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myform:any

  constructor(
    private authservice:AuthService,
    private router:Router
    
    ) { }

  ngOnInit(): void {
    this.myform =new FormGroup({

      'email':new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null, Validators.required),
     
    })
  }
  login(){
    this.authservice.login(this.myform.value)
    .subscribe((res)=>{
        console.log(res)
      }
    )
    this.myform.reset()
  }
  

}
