import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnauthorizedError } from 'src/app/common/error-exceptions/unauthorized-error';

import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public products: IProduct[] = [];
  private getAllProductsSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
      this.getAllProductsSubscription = new Subscription();
     }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.getAllProductsSubscription = this.productService.getAllProducts()
      .subscribe({
        next: (response: any)=>{
          this.products = response.Data;
          console.log(this.products);
        },
        error: (err)=>{
          console.log(err);
          if(err instanceof UnauthorizedError){
            alert("Unauthorized Access!");
            // this.router.navigate(['/login'], {
            //   queryParams:{
            //     returnUrl: this.route.
            //   }
            // });
          }
        }
      });
  }

  ngOnDestroy(): void {

    if(this.getAllProductsSubscription)
      this.getAllProductsSubscription.unsubscribe();

  }

  onProductDetail(product: IProduct){
    this.router.navigate(['/products/product', product.Id]);

  }

}
