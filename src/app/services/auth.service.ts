import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LoggedUserInfo } from '../models/logged-user-info.model';
import { UserRegistrationModel } from '../models/user-registration.model';
import { DataService } from './data.service';

@Injectable()
export class AuthService extends DataService {


  //private loggedUserInfo: LoggedUserInfo | undefined;
  private isLoggedUserInfo = new BehaviorSubject(false);
  
  // private userSubject;
  // public getUser$;

  private userEmail = "";

  constructor(http: HttpClient) { 
    super(http);

    // this.userSubject = new BehaviorSubject(localStorage.getItem('email'));
    // this.userSubject = new BehaviorSubject(this.userEmail);
    //   this.getUser$ = this.userSubject.asObservable();
    
    // this.isLoggedUserInfo.next(true);
  }

  // public getUserInfo(){
  //   return this.userSubject.value;
  // }

  register(newUser : UserRegistrationModel) {
    return super.create( 'https://localhost:44315/api/auth/register', newUser)
  }

  login(email:string, password: string) {
    return super.create('https://localhost:44315/api/auth/login', { email, password})
      .pipe(map((response: any)=>{
        const token = response['Token'];

        if(token){
          localStorage.setItem('token', token);
        }
          
        this.userEmail = email;
        // this.userSubject.next(this.userEmail);

        console.log("Login response = ", response);

        return response;
      }));
  }

  logout(){
    const tokenFromStorage = localStorage.getItem('token');
        
        if(tokenFromStorage){
          localStorage.removeItem('token');
        }

        this.userEmail = "";
        // this.userSubject.next(this.userEmail);
  }

  getUser(){
    const getUserUrl = "https://localhost:44315/api/auth/getuser";

    return super.get(getUserUrl);
  }

}
