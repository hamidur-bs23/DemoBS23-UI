import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  newCategory: Category = {id: 0, name: 'Hamid'}

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onCreate(data: any){
    console.log(data);
    this.newCategory.name = data.categoryName;

    this.categoryService.createCategory(this.newCategory)
      .subscribe({
        next: (response: any)=>{
          console.log(response);
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        error: (err)=>{
          console.log(err);
        }
      });
  }

}
