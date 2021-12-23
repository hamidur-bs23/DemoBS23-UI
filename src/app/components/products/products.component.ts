import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  private products: any[] = [];
  private subscription: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.subscription = this.productService.getAllProducts()
      .subscribe({
        next: (response: any)=>{
          this.products = response.Data;
          console.log(this.products);
        },
        error: (err)=>{
          console.log(err);
        }
      });
  }

  ngOnDestroy(): void {
      
  }

}
