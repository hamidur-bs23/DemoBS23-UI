import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  @Input('userEmail') userEmail: string = "";

  constructor(
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.userEmail);
  }

  onLogoutClicked(){
    if(confirm("Do you want to logout?")){
      this.authService.logout();

      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(){ }

}
