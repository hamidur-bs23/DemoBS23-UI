import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { AppToastrService } from 'src/app/services/app-toastr.service';

import { Product } from 'src/app/models/product.model';
import { AppError } from 'src/app/common/error-exceptions/app-error';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private appToastrService: AppToastrService) { }

  ngOnInit(): void {
  }

  onSave(editedProduct: Product){
    if(confirm("Want to update?")){

      this.productService.updateProduct(editedProduct)
      .subscribe({
        next: (response: any)=>{  
          console.log(response);
          this.appToastrService.showInfo("Edit Succesful", "Update");
  
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        error: (err: AppError)=>{
          console.log(err);
          this.appToastrService.showErrorBasedOnAppErrorInstance(err);
        }
      })
    }
  }
}
