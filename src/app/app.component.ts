import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { AppConfigService } from './services/app-config.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DemoBS23-UI';

  userEmail: string = "";

  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {

    this.authService.userSubject$
      .subscribe({
        next: (userData: any)=>{
          this.userEmail = userData['Email'];
        },
        error: (err)=>{
          this.userEmail = "";
          console.log(err);
        }
      });
  }


}
