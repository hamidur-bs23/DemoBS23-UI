import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, NotFoundError } from 'rxjs';
import { AppError } from 'src/app/common/error-exceptions/app-error';
import { BadInputError } from 'src/app/common/error-exceptions/bad-input-error';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit(loginForm: NgForm){
    console.log(loginForm);

    this.submitted = true;

    if(loginForm.invalid)
      return;

    const email = loginForm.controls['email'].value;
    const password = loginForm.controls['password'].value;

    this.authService.login(email, password)
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: (err: AppError) => {

          if(err instanceof BadInputError) {
            console.log("Bad Input Error - ", err.originalError);            
          } else if(err instanceof NotFoundError) {
            console.log("Not Found Error - ", err.originalError)
          } else {
            // throw err;
            console.log("Error - ", err);
          }

        }
      });
  }

}
