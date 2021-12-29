import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';
import { AddEditProductFormComponent } from './components/add-edit-product-form/add-edit-product-form.component';
import { ViewComponent } from './pages/view/view.component';


@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ListComponent,
    AddEditProductFormComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
