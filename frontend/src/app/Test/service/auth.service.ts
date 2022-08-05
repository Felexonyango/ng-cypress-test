import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iregister,Ilogin } from '../model/auth';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  // register(data:Iregister){
  //   return this.http.post('https://hidden-spire-13945.herokuapp.com/register',data)
  //   .pipe(map((res)=>{
  //     return res
  //   }))

  // }

  login(data:Ilogin){
    return this.http.post('https://devconector.herokuapp.com/api/auth',data)
    .pipe(map((res)=>{
      return res
    }))

    
  }
}
