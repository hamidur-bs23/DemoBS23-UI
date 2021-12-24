import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

import { AuthService } from "./auth.service";

@Injectable()
export class AppConfigService {
       
    constructor(
        private authService: AuthService) {
    }

    async loadAppConfig(){

        this.getUserFromAPI();
    }

    async getUserFromAPI(){
        this.authService.getUserFromAPI()
            .subscribe({
                next: (userData: User)=>{
                    this.authService.saveUserFromAppConfig(userData);
                },
                error: (err)=>{
                    console.log(err);
                }
            });
    }
}