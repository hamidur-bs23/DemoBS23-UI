import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  categories : any[] = [];

  imagePath: string = '../../../../assets/images/demo-1.png';

  private getAllCategoriesSubscription: Subscription;

  constructor(private categoryService: CategoryService) {
    this.getAllCategoriesSubscription = new Subscription();
   }

  ngOnInit(): void {
    this.getAll();
  }

  ngOnDestroy(): void {
    if(this.getAllCategoriesSubscription)
      this.getAllCategoriesSubscription.unsubscribe();
  }

  getAll(){
    this.getAllCategoriesSubscription = this.categoryService.getAllCategories()
      .subscribe({
        next: (response: any)=>{
          this.categories = response['Data'];
          console.log(this.categories);
        },
        error: (err)=>{
          console.log(err);
        }
      });
  }
}
