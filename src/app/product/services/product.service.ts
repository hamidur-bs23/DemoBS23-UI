import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import { DataService } from "src/app/services/data.service";

import { map, Observable } from "rxjs";
import { Product } from "src/app/models/product.model";

@Injectable()
export class ProductService extends DataService{
    

    getAllProducts(): Observable<Product[]>{
        const urlGetAll = environment.appBaseUrl + "/product/getall";

        return super.getAll(urlGetAll)
            .pipe(
                map((response: any)=>{
                    return response.Data
                })
            );
    }

    getProductById(id: number): Observable<Product>{
        const urlGetProductById = environment.appBaseUrl + "/product/get";

        return super.get(urlGetProductById, id)
            .pipe(
                map((response: any) => {
                    if(response['Data']){
                        console.log(response['Data'])
                        return response['Data'];
                    }
                })
            );
    }

    createProduct(newProduct: Product){
        const url = environment.appBaseUrl + "/product/add";
        
        return super.create(url, newProduct);
    }

    updateProductById(product: Product){
        const url = environment.appBaseUrl + "/product/update";
        
        return super.create(url, product);
    }

    deleteProductById(id: number){
        const url = environment.appBaseUrl + "/product/delete";

        super.delete(url, id);
    }
}