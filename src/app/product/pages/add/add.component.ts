import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      if(this.onSaveSubscription)
        this.onSaveSubscription.unsubscribe();
  }

  onSave(newProduct: any){
    this.productService.createProduct(newProduct)
      .subscribe({
        next: (response: any)=>{
          
          console.log(response);
          alert("Add successful");

          this.router.navigate(['../'], {relativeTo: this.route});
        },
        error: (err)=>{
          console.log(err);
        }
      })
  }

}
