import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductService } from '../../services/product.service';

import { Product } from 'src/app/models/product.model';
import { AppToastrService } from 'src/app/services/app-toastr.service';
import { AppError } from 'src/app/common/error-exceptions/app-error';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  product: Product;
  id: number;
  imagePath: string = '../../../../assets/images/demo.png';

  getProductSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private appToastrService: AppToastrService) {

   }

  ngOnInit(): void {
    this.init();

    if(this.id){
      this.getProductById(this.id);
    }
  }

  ngOnDestroy(): void {
      if(this.getProductSubscription)
        this.getProductSubscription.unsubscribe();
  }

  init(){
    this.route.params.subscribe({
      next: (params: Params) => {
        this.id = (<number>params['id']);
        console.log(this.id);
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  getProductById(id: number) {
    this.getProductSubscription = this.productService.getProductById(id)
    .subscribe({
      next: (data: Product)=>{
        this.product = data;
        
        console.log(this.product);
      },
      error: (err: AppError)=>{
        console.log(err);
        this.appToastrService.showErrorBasedOnAppErrorInstance(err);
      }
    });
  }

  onDelete(){

    if(this.id && confirm("Want to delete?")){

      this.productService.deleteProduct(this.id)
        .subscribe({
          next: (response: any)=>{
            console.log(response)
            this.appToastrService.showError("Deleted successfully", "Delete");

            this.router.navigate(['../'], {relativeTo: this.route});
          },
          error: (err)=>{
            console.log(err);
            this.appToastrService.showErrorBasedOnAppErrorInstance(err);
          }
        })
    }
    return;
  }

  onEdit(){
    
    this.router.navigate(['edit'], {relativeTo: this.route});

  }
}
