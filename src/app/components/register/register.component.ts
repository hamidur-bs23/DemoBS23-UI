import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppError } from 'src/app/common/error-exceptions/app-error';
import { BadInputError } from 'src/app/common/error-exceptions/bad-input-error';
import { UserRegistrationModel } from 'src/app/models/user-registration.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  registeredUserInfo: any = {
    token: "",
    refreshToken: ""
  };

  newUserModel : UserRegistrationModel = {
    username: "",
    email: "",
    password: ""
  }

  onSubmit(registerForm: NgForm){
    console.log(registerForm);
    console.log(this.newUserModel);

    this.authService.onRegister(this.newUserModel)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          if(response['Token']){
            this.registeredUserInfo.token = response['Token'];
            this.registeredUserInfo.refreshToken = response['RefreshToken'];

            console.log(this.registeredUserInfo);

            sessionStorage.setItem('token', this.registeredUserInfo.token);
            sessionStorage.setItem('refreshtoken', this.registeredUserInfo.refreshToken);
          }
        },
        error: (err: AppError) => {
          if(err instanceof BadInputError) {
            console.log("Bad Input Error - ", err.originalError);            
          } else {
            throw err;
          }
        }
      });
  }
}
