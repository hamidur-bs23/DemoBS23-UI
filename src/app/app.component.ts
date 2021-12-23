import { Component, OnInit } from '@angular/core';
import { AppConfigService } from './services/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DemoBS23-UI';
  appConfigData: any;

  constructor(private appconfigService: AppConfigService) {
    
  }

  ngOnInit(): void {
    //this.appConfigData = this.appconfigService.getAppConfig();
    
    //console.log(this.appConfigData);
  }


}
