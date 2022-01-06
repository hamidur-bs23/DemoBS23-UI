import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr'; 

import { AuthService } from './services/auth.service';
import { AppConfigService } from './services/app-config.service';

import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Welcome to Shopper (Demo Shop)';

  user: User = {email: ""};
  getUserSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService) {

  }

  ngOnInit(): void {

    this.getUserSubscription = this.authService.getUser$
      .subscribe({
        next: (userData: User)=>{
          this.user.email = userData.email;
        },
        error: (err)=>{
          this.user.email = "";
          console.log(err);
        }
      });
  }


}
