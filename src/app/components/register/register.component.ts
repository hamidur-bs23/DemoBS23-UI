import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  newUserModel : UserRegistrationModel = {
    username: "",
    email: "",
    password: ""
  }

  onSubmit(registerForm: NgForm){
    console.log(registerForm);

    if(registerForm.invalid)
      return;

    this.authService.register(this.newUserModel)
      .subscribe({
        next: (response: any) => {

          if(response['Token']){
            sessionStorage.setItem('token', response['Token']);

            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
            this.router.navigateByUrl(returnUrl);

          }
        },
        error: (err: AppError) => {
          if(err instanceof BadInputError) {
            console.log(err);  

            var errs: [] = err.originalError['error'].errors || err.originalError['error'].Errors;
            for(let e in errs){
              console.log(String(errs[e]));
            }

          } else {
            console.log("Unexpected user registration error!", err.originalError);
          }
        }
      });
  }
}
