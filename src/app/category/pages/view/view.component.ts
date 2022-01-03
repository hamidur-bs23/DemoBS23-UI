import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CategoryService } from '../../services/category.service';

import { Category } from 'src/app/models/category.model';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  id: number = 0;
  category: any = {};

  imagePath: string = '../../../../assets/images/demo-1.png';
  
  private initSubscription: Subscription;
  private getCategorySubscription: Subscription;
  private onDeleteSubscription: Subscription;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router) {
      
      this.getCategorySubscription = new Subscription();
   }

  ngOnInit(): void {
    
    this.init();

    this.getById(this.id);

  }

  ngOnDestroy(): void {
    
    if(this.initSubscription)
      this.initSubscription.unsubscribe();
    if(this.getCategorySubscription)
      this.getCategorySubscription.unsubscribe();
    if(this.onDeleteSubscription)
      this.onDeleteSubscription.unsubscribe();
  }

  init(){
    this.initSubscription = this.route.params.subscribe({
      next: (params: Params) => {
        this.id = params['id'];
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  getById(id: number){
    this.getCategorySubscription = this.categoryService.getCategoryById(id)
    .subscribe({
      next: (data: any)=>{
        this.category = data;
        console.log(this.category);
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  onEdit(categoryForEdit: Category){
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDelete(id: number) {
    console.log(id);

    this.onDeleteSubscription = this.categoryService.deleteCategory(id)
      .subscribe({
        next: (resposne: any)=>{
          console.log("Response - ", resposne);
          if(resposne.Success){
            this.router.navigate(['../'], {relativeTo: this.route});
          }
        },
        error: (err)=>{
          console.log(err);
        }
      });
  }

}
