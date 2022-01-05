import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductService } from 'src/app/product/services/product.service';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  msg = "Welcome to Shopper (Demo Shop)";
  products: Product[];
  public imagePath: string = '../../assets/images/demo.png';

  getAllProductsSubscription: Subscription;

  constructor(
    private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
      if(this.getAllProductsSubscription)
        this.getAllProductsSubscription.unsubscribe();
  }

  loadProducts(){
    this.getAllProductsSubscription = this.productService.getAllProducts()
      .subscribe({
        next: (response: Product[])=>{
          console.log(response);
          this.products = response;
        },
        error: (err)=>{
          console.log(this.products);
        }
      })
  }

}
