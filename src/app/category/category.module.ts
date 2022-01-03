import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';
import { ViewComponent } from './pages/view/view.component';
import { AddEditFormComponent } from './components/add-edit-form/add-edit-form.component';


@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ListComponent,
    ViewComponent,
    AddEditFormComponent,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule
  ]
})
export class CategoryModule { }
