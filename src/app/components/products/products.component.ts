import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public products: IProduct[] = [];
  private subscription: any;

  constructor(
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    // this.getAllProducts();
    this.products = this.productService.getAllProducts();
  }

  // getAllProducts(){
  //   this.subscription = this.productService.getAllProducts()
  //     .subscribe({
  //       next: (response: any)=>{
  //         this.products = response.Data;
  //         console.log(this.products);
  //       },
  //       error: (err)=>{
  //         console.log(err);
  //       }
  //     });
  // }

  ngOnDestroy(): void {
      
  }

  onProductDetail(product: IProduct){
    this.router.navigate(['/products/product', product.Id]);

  }

}
