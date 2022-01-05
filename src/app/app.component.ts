import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppConfigService } from './services/app-config.service';
import { AuthService } from './services/auth.service';

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

  constructor(private authService: AuthService) {
    this.getUserSubscription = new Subscription;
  }

  ngOnInit(): void {

    this.getUserSubscription = this.authService.getUser$
      .subscribe({
        next: (userData: any)=>{
          this.user.email = userData.Email;
          console.log("User Data - ", this.user);
        },
        error: (err)=>{
          this.user.email = "";
          console.log(err);
        }
      });
  }


}
