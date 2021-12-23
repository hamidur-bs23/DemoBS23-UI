import { Injectable } from "@angular/core";
import { DataService } from "./data.service";

import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { IProduct } from "../models/product.model";

@Injectable()
export class ProductService extends DataService {

    private appBaseUrl = environment.appBaseUrl;

    private urlGetAll = this.appBaseUrl + "/product/getall";

    private products: IProduct[] = [];

    getAllProducts(){
        console.log(this.appBaseUrl);
        // return super.getAll(this.urlGetAll);
        super.getAll(this.urlGetAll)
            .subscribe({
                next: (response: any)=>{
                    this.products = response['Data'];
                    console.log(this.products);
                }
            });

            return this.products;

    }
}