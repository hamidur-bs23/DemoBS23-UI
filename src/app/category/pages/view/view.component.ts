import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from '../../services/category.service';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  id: number = 0;
  category: any = {};

  imagePath: string = '../../../../assets/images/demo-1.png';
  
  private getCategorySubscription: Subscription;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute) {
      
      this.getCategorySubscription = new Subscription();
   }

  ngOnInit(): void {
    
    this.init();

    this.getById(this.id);

  }

  ngOnDestroy(): void {
      if(this.getCategorySubscription)
        this.getCategorySubscription.unsubscribe();
  }

  init(){
    this.route.params.subscribe({
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

  onEdit(){

  }

  onDelete(){

  }

}
