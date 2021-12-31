import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSave(editedProduct: Product){
    if(confirm("Want to update?")){

      this.productService.updateProduct(editedProduct)
      .subscribe({
        next: (response: any)=>{
  
          console.log(response);
          alert("Update successful");
  
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        error: (err)=>{
          console.log(err);
        }
      })

    }

  }

}
