import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';``
import { UserRegistrationModel } from '../models/user-registration.model';
import { DataService } from './data.service';
import { User } from '../models/user.model'

@Injectable()
export class AuthService extends DataService {
  
  private userSubject$;
  public get getUser(): Observable<User>{
    return this.userSubject$.asObservable();
  }

  constructor(http: HttpClient) { 
    super(http);

    this.userSubject$ = new BehaviorSubject<User>({email: ""});
  }

  register(newUser : UserRegistrationModel) {
    return super.create( 'https://localhost:44315/api/auth/register', newUser)
  }

  login(email:string, password: string) {
    return super.create('https://localhost:44315/api/auth/login', { email, password })
      .pipe(map((response: any)=>{
        const token = response['Token'];

        if(token){
          localStorage.setItem('token', token);
          localStorage.setItem('email', email);
        }

        const user: User = {
          email: email
        }
          
        this.userSubject$.next(user);

        return response;
      }));
  }

  logout(){
  
    const tokenFromStorage = localStorage.getItem('token');
        
        if(tokenFromStorage){
          localStorage.removeItem('token');
          localStorage.removeItem('email');
        }

        this.userSubject$.next({email: ""});
  }

  getUserFromAPI(): Observable<any>{
    const getUserUrl = "https://localhost:44315/api/auth/getuser";

    return super.get(getUserUrl);
  }

  saveUserFromAppConfig(userData: User){
    this.userSubject$.next(userData);
    //console.log(this.userSubject$.value);
  }

}
