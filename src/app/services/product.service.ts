import { Injectable } from "@angular/core";
import { DataService } from "./data.service";

import { environment } from "src/environments/environment";

@Injectable()
export class ProductService extends DataService {

    private appBaseUrl = environment.appBaseUrl;

    private urlGetAll = this.appBaseUrl + "/product/getall";

    private products: any[] = [];

    getAllProducts(){
        console.log(this.appBaseUrl);
        return super.getAll(this.urlGetAll);
    }
}