import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  private product: Product;

  constructor(private productService: ProductService) {

   }

  ngOnInit(): void {
  }

  getProductById(id: number) {
    this.productService.getProductById(id)
    .subscribe({
      next: (data: Product)=>{
        this.product = data;
        
        console.log(data, this.product);
      }
    });
  }

}
