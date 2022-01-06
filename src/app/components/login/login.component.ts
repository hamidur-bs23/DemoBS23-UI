import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { first, NotFoundError, Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { AppToastrService } from 'src/app/services/app-toastr.service';

import { AppError } from 'src/app/common/error-exceptions/app-error';
import { BadInputError } from 'src/app/common/error-exceptions/bad-input-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  submitted = false;
  loginSubscription : Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private appToastrService: AppToastrService) {
      this.loginSubscription = new Subscription;
     }

  ngOnInit(): void {
  }


  onSubmit(loginForm: NgForm){
    console.log(loginForm);

    this.submitted = true;

    if(loginForm.invalid)
      return;

    const email = loginForm.controls['email'].value;
    const password = loginForm.controls['password'].value;

    this.loginSubscription = this.authService.login(email, password)
      .pipe(first())
      .subscribe({

        next: (response: any) => {
          this.appToastrService.showSuccess("Loggin succesful", `${email}`);

          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },

        error: (err: AppError) => {
          this.appToastrService.showErrorBasedOnAppErrorInstance(err);
        }
      });
  }

  ngOnDestroy(): void {
    if(this.loginSubscription)
      this.loginSubscription.unsubscribe();
  }

}
