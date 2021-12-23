import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom } from "rxjs";

@Injectable()
export class AppConfigService {
    
    private appConfigSubject: BehaviorSubject<any>;
    private get appConfigData() {
        return this.appConfigSubject.value;
    }

    constructor(private http: HttpClient) {
        this.appConfigSubject = new BehaviorSubject<any>(null);
    }

    async loadAppConfig(){

        var val = await firstValueFrom(this.http.get('/assets/appConfig.json'))
        this.appConfigSubject.next(val);
            
    }

    getAppConfig(){
        return this.appConfigData;
    }
}