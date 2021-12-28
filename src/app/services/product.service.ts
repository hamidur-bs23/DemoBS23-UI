import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { DataService } from "./data.service";
import { Product } from "../models/product.model";

@Injectable()
export class ProductService extends DataService {

    private urlGetAll = environment.appBaseUrl + "/product/getall";
    private urlGetProductById = environment.appBaseUrl + "/product/get";

    getAllProducts(){
        return super.getAll(this.urlGetAll);
    }

    getProductById(id: number): Observable<Product>{
        return super.get(this.urlGetProductById, id)
            .pipe(
                map((response: any) => {
                    if(response['Data']){
                        console.log(response['Data'])
                        return response['Data'];
                    }
                })
            );
    }
}