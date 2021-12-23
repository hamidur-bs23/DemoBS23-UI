import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { AppError } from 'src/app/common/error-exceptions/app-error';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  userEmail: any;
  isLogged: boolean = false;
  
  private loggedUserInfoSubscription: Subscription = new Subscription();
  // private isLoggedSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {

    if(localStorage.getItem('token')){
      this.authService.getUser();
      
      this.isLogged = true;
    }

    // this.loggedUserInfoSubscription = this.authService.getUser$.subscribe({
    //   next: (email) => {
    //     this.userEmail = email;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });
    
    // this.isLoggedSubscription = this.authService.getUser()
    //   .subscribe({
    //     next: (response) =>{
    //       console.log(response);
          
    //       //this.userEmail = response;
    //       //this.appConfigSubject.next(this.userEmail);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     }
    //   })
  }

  


  onLogoutClicked(){
    this.authService.logout();

    this.router.navigate(['/home']);
  }

  ngOnDestroy(){
    this.loggedUserInfoSubscription.unsubscribe();
    // this.isLoggedSubscription.unsubscribe();
  }

}
