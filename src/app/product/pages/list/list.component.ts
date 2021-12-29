import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  
  public products: Product[] = [];

  public getAllSubscription: Subscription;

  constructor(
    private productService: ProductService) {

     }

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngOnDestroy(): void {
      if(this.getAllSubscription)
        this.getAllSubscription.unsubscribe();
  }

  getAllProducts(){
    this.getAllSubscription = this.productService.getAllProducts()
      .subscribe({
        next: (data: Product[])=>{
          this.products = data;
          
          console.log(this.products);
        }
      });
  }

}
