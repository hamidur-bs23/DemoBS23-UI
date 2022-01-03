import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  id: number;
  category: Category;

  getIdFromUrlSubscription: Subscription;
  getCategoryByIdSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getIdFromUrl();
    if(this.id){
      this.getCategoryById(this.id);
    }
  }

  ngOnDestroy(): void {
      if(this.getIdFromUrlSubscription)
        this.getIdFromUrlSubscription.unsubscribe();

      if(this.getCategoryByIdSubscription)
        this.getCategoryByIdSubscription.unsubscribe();
  }

  getIdFromUrl(){
    this.getIdFromUrlSubscription = this.route.params.subscribe({
      next: (params: Params)=>{
        this.id = params['id'];
        console.log(this.id);
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  getCategoryById(id: number){
    this.getCategoryByIdSubscription = this.categoryService.getCategoryById(id)
      .subscribe({
        next: (value: Category)=>{
          this.category = value;
          console.log(this.category);
        },
        error: (err)=>{
          console.log(err);
        }
      })
  }

}
