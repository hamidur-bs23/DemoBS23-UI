import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginModel } from '../models/user-login.model';
import { UserRegistrationModel } from '../models/user-registration.model';
import { DataService } from './data.service';

@Injectable()
export class AuthService extends DataService {

  constructor(http: HttpClient) { 
    super(http);
  }

  onRegister(user : UserRegistrationModel) {
    return super.create( 'https://localhost:44315/api/auth/register', user)
  }
  onLogin(user : UserLoginModel) {
    return super.create('https://localhost:44315/api/auth/login', user)
  }

}
