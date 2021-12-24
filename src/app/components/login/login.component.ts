import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, NotFoundError, Subscription } from 'rxjs';
import { AppError } from 'src/app/common/error-exceptions/app-error';
import { BadInputError } from 'src/app/common/error-exceptions/bad-input-error';
import { AuthService } from 'src/app/services/auth.service';

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
    private router: Router) {
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

          alert("Thank you for login");

          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);

        },
        error: (err: AppError) => {

          if(err instanceof BadInputError) {
            console.log("Bad Input Error - ", err.originalError);  
            alert("Bad Input Error");          
          } else if(err instanceof NotFoundError) {
            console.log("Not Found Error - ", err.originalError)
            alert("Not Found Error");
          } else {
            // throw err;
            console.log("Unexpected Error - ", err);
            alert("Unexpected Error");
          }

        }
      });
  }

  ngOnDestroy(): void {
    if(this.loginSubscription)
      this.loginSubscription.unsubscribe();
  }

}
