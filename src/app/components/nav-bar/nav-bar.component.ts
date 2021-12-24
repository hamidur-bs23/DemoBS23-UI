import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  @Input('userEmail') userEmail: string = "no-email";

  constructor(
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.userEmail);
  }

  onLogoutClicked(){
    this.authService.logout();

    this.router.navigate(['/']);
  }

  ngOnDestroy(){ }

}
