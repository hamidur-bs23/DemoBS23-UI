import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { ProductService } from '../../services/product.service';
import { AppToastrService } from 'src/app/services/app-toastr.service';

import { Product } from 'src/app/models/product.model';
import { AppError } from 'src/app/common/error-exceptions/app-error';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy, OnChanges {

  public products: Product[] = [];
  public imagePath: string = '../../../../assets/images/demo.png';

  public getAllSubscription: Subscription;
  public onDeleteSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private appToastrService: AppToastrService) {

  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnDestroy(): void {
    if (this.getAllSubscription)
      this.getAllSubscription.unsubscribe();

    if (this.onDeleteSubscription)
      this.onDeleteSubscription.unsubscribe();
  }

  getAllProducts() {
    this.getAllSubscription = this.productService.getAllProducts()
      .subscribe({
        next: (data: Product[]) => {
          if(data.length > 0){
            this.products = data;
          }else {
            this.products = null;
          }

          console.log(this.products);
        }
      });
  }

  onEdit(productToUpdate: Product) {
    console.log(productToUpdate);
    this.router.navigate(['./', productToUpdate.Id, 'edit'], { relativeTo: this.route });

  }

  onDelete(id: number) {
    if (confirm("Want to delete?")) {

      this.onDeleteSubscription = this.productService.deleteProduct(id)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            this.appToastrService.showWarning("Deleted Successful", "Delete");

            this.getAllProducts();

            this.router.navigate(['/product']);
          },
          error: (err: AppError) => {
            console.log(err);
            this.appToastrService.showErrorBasedOnAppErrorInstance(err);
          }
        });

    }

  }

}
