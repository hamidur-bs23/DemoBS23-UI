import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { AppToastrService } from 'src/app/services/app-toastr.service';

import { AppError } from 'src/app/common/error-exceptions/app-error';
import { BadInputError } from 'src/app/common/error-exceptions/bad-input-error';

import { UserRegistrationModel } from 'src/app/models/user-registration.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private appToastrService: AppToastrService) { }

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
            
            this.appToastrService.showSuccess("Registration Successful", "Registration");
            
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
            this.router.navigateByUrl(returnUrl);

          }
        },
        error: (err: AppError) => {
          this.appToastrService.showErrorBasedOnAppErrorInstance(err);
        }
      });
  }
}
