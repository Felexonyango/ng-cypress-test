import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iregister,Ilogin } from '../model/auth';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  register(data:Iregister){
    return this.http.post(' https://fast-fjord-09551.herokuapp.com/register',data)
    .pipe(map((res)=>{
      return res
    }))

  }

  login(data:Ilogin){
    return this.http.post('login',data)
    .pipe(map((res)=>{
      return res
    }))

    
  }
}
