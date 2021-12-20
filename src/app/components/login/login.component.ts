import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotFoundError } from 'rxjs';
import { AppError } from 'src/app/common/error-exceptions/app-error';
import { BadInputError } from 'src/app/common/error-exceptions/bad-input-error';
import { UserLoginModel } from 'src/app/models/user-login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  userInfoForLoggin : UserLoginModel = {
    email: "",
    password: ""
  }

  loggedUserInfo: any = {
    token: "",
    refreshToken: ""
  };

  // onSubmit(loginForm: NgForm){
  //   console.log(loginForm);
  //   console.log(this.model);

  //   let userCredForLogin = {
  //     email: this.model.email,
  //     password: this.model.password
  //   };

  //   this.authService.onLogin(userCredForLogin);
  // }


  onSubmit(loginForm: NgForm){
    console.log(loginForm);

    this.userInfoForLoggin.email = loginForm.controls['email'].value;
    this.userInfoForLoggin.password = loginForm.controls['password'].value;
    console.log(this.userInfoForLoggin);

    this.authService.onLogin(this.userInfoForLoggin)
      .subscribe({
        next: (response: any) => {
          console.log(response);

          if(response['Token']){
            this.loggedUserInfo.token = response['Token'];
            this.loggedUserInfo.refreshToken = response['RefreshToken'];

            console.log("Logged User Info - ", this.loggedUserInfo);

            localStorage.setItem('token', this.loggedUserInfo.token);
            localStorage.setItem('refreshtoken', this.loggedUserInfo.refreshToken);
          }
        },
        error: (err: AppError) => {
          if(err instanceof BadInputError) {
            console.log("Bad Input Error - ", err.originalError);            
          } else if(err instanceof NotFoundError) {
            console.log("Not Found Error - ", err.originalError)
          } else {
            throw err;
          }
        }
      });
  }

}
