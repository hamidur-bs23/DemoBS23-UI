import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';

import { DataService } from 'src/app/services/data.service';

import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DataService {

  constructor(http: HttpClient) {
    super(http);
  }

  getCategoryById(id: number): Observable<Category> {
    const url: string = environment.appBaseUrl + "/product/category/get/" + id;

    return super.get(url, id)
      .pipe(map((response: any)=>{
        return response['Data'];
      }));
  }

  getAllCategories(){
    const url: string = environment.appBaseUrl + "/product/category/getall";

    return super.get(url);
  }

  createCategory(newCategory: Category){
    const url: string = environment.appBaseUrl + "/product/category/add";

    return super.create(url, newCategory);
  }

}
