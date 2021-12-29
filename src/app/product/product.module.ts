import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ListComponent } from './pages/list/list.component';
import { ViewComponent } from './pages/view/view.component';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { AddEditFormComponent } from './components/add-edit-form/add-edit-form.component';


@NgModule({
  declarations: [
    ListComponent,
    ViewComponent,
    AddComponent,
    EditComponent,
    AddEditFormComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
