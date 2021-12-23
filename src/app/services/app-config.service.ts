import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AppConfigService {
    
    //private appConfigSubject: BehaviorSubject<any>;
    // private get appConfigData() {
        //     return this.appConfigSubject.value;
        // }
    private isLoggedUserSubject: BehaviorSubject<boolean>;
    private get appIsLoggedUser() {
        return this.isLoggedUserSubject.value;
    }

        
    constructor(private http: HttpClient, private authService: AuthService) {
        //this.appConfigSubject = new BehaviorSubject<any>(null);
        this.isLoggedUserSubject = new BehaviorSubject<boolean>(false);
    }

    async loadAppConfig(){

        //var val = await firstValueFrom(this.http.get('/assets/appConfig.json'))
        this.authService.getUser()
            .subscribe({
                next: (response: any)=>{
                    var userData = response['Email'];
                    console.log();
                    // this.appConfigSubject.next(userData);
                    this.isLoggedUserSubject.next(true);
                },
                error: (err) => {
                    console.log(err);
                }
            });
    }

    // getAppConfig(){
    //     return this.appConfigData;
    // }
}