import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from 'src/app/services/data.service';

import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DataService {

  private baseUrl = environment.appBaseUrl + '/product';

  constructor(http: HttpClient) {
    super(http);
   }

   getAllProducts(): Observable<Product[]> {
    const url = this.baseUrl + '/getall';

    return super.getAll(url)
      .pipe(
        map((response: any)=>{
          console.log(response);
          return response.Data as Product[];
        })
      );
   }

   getProductById(id: number): Observable<Product> {
    const url = this.baseUrl + '/get/' + id;

    return super.get(url)
      .pipe(
        map((response: any)=>{
          //console.log(response);
          return response.Data as Product;
        })
      );
   }

   createProduct(newProduct: Product){
    const url = this.baseUrl + '/add';

    return super.create(url, newProduct);
   }


   updateProduct(updatedProduct: Product){
     console.log(updatedProduct);

    const url = this.baseUrl + '/update';

    return super.update(url, updatedProduct);

   }

   deleteProduct(id: number){
    const url = this.baseUrl + '/delete';

    return super.delete(url, id);

   }



  //  private currentProductBehaviorSubject = new BehaviorSubject<Product>(null);
  //  currentProduct$ = this.currentProductBehaviorSubject.asObservable();

  //  changeCurrentProduct(newProduct: Product){
  //    this.currentProductBehaviorSubject.next(newProduct);
  //  }

}
