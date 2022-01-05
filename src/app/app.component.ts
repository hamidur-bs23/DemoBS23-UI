import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './models/user.model';
import { AppConfigService } from './services/app-config.service';
import { AuthService } from './services/auth.service';

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
