import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
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

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) {
    
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

  onEdit(categoryForUpdate:any) {
    //console.log("onEditClicked - ", categoryForUpdate, categoryForUpdate.Id);

    this.router.navigate(['./', categoryForUpdate.Id, 'edit'], {relativeTo: this.route});
  }

  onDelete(id: number) {
    console.log(id);
  }
}
