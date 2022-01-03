import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CategoryService } from '../../services/category.service';

import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

  newCategory: Category;

  createCategorySubscription: Subscription;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
      if(this.createCategorySubscription)
        this.createCategorySubscription.unsubscribe();
  }

  onCreate(formValue: Category){

    this.createCategorySubscription = this.categoryService.createCategory(formValue)
    .subscribe({
      next: (response: any)=>{
        if(response.Success){
          this.router.navigate(['../'], {relativeTo: this.route});
        }
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

}
