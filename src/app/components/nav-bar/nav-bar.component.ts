import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  userEmail: any;
  
  private userEmailSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {

    this.userEmailSubscription = this.authService.getUser$.subscribe({
      next: (email) => {
        this.userEmail = email;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  onLogoutClicked(){
    this.authService.logout();

    this.router.navigate(['/home']);
  }

  ngOnDestroy(){
    this.userEmailSubscription.unsubscribe();
  }

}
