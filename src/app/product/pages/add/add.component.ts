import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppError } from 'src/app/common/error-exceptions/app-error';
import { AppToastrService } from 'src/app/services/app-toastr.service';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

  private onSaveSubscription: Subscription;


  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private appToastrService: AppToastrService) {

     }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      if(this.onSaveSubscription)
        this.onSaveSubscription.unsubscribe();
  }

  onSave(newProduct: any){
    this.onSaveSubscription = this.productService.createProduct(newProduct)
      .subscribe({
        next: (response: any)=>{          
          console.log(response);
          this.appToastrService.showSuccess("Added Successfully", "Add");

          this.router.navigate(['../'], {relativeTo: this.route});
        },
        error: (err: AppError)=>{
          console.log(err);
          this.appToastrService.showErrorBasedOnAppErrorInstance(err);
        }
      })
  }

}
