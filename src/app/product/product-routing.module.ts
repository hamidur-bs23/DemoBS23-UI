import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';
import { ViewComponent } from './pages/view/view.component';

const routes: Routes = [
  
  { path: 'add', component: AddComponent, pathMatch: 'full' },

  { path: ':id/edit', component: EditComponent, pathMatch: 'full' },
  { path: ':id', component: ViewComponent, pathMatch: 'full' },
  
  { path: '', component: ListComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
