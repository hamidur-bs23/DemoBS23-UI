import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const exportedModules: any[] = [
  ReactiveFormsModule,
  FormsModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    ...exportedModules
  ],
  exports: [ ...exportedModules ]
})
export class SharedModule { }
