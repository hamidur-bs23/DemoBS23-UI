import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { User } from "../models/user.model";
import { AuthService } from "./auth.service";

@Injectable()
export class AppConfigService {
       
    constructor(
        private http: HttpClient, 
        private authService: AuthService) {
    }

    async loadAppConfig(){

        this.getUserFromAPI();
    }

    async getUserFromAPI(){
        this.authService.getUser()
            .subscribe({
                next: (userData: string)=>{
                    this.authService.saveUserFromAppConfig(userData);
                },
                error: (err)=>{
                    console.log(err);
                }
            });
    }
}