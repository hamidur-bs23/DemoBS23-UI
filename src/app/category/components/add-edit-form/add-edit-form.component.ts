import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.scss']
})
export class AddEditFormComponent implements OnInit {

  addEditForm: FormGroup;

  @Input('isEdit') isEditMode: boolean = false;
  @Input('dataForEdit') dataForEdit: any = null;

  @Output('editEvent') editEvent = new EventEmitter<any>();
  @Output('addEvent') addEvent = new EventEmitter<Category>();

  constructor(
    private fb: FormBuilder) {

  }
 
  ngOnInit(): void {

      this.createForm();

      if(this.isEditMode && this.dataForEdit){
        this.populateForm();
      }
      
  }

  onSubmit(){
    if(this.isEditMode){
      this.onUpdate();
    } else {
      this.onCreate();
    }
  }

  createForm(){
    this.addEditForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]]
    });
  }

  populateForm(){
    this.addEditForm.patchValue({
      id: this.dataForEdit.Id,
      name: this.dataForEdit.Name
    });
  }

  onUpdate(){
    if(this.addEditForm.valid){
      this.editEvent.emit(this.addEditForm.value);
    }
  }

  onCreate(){
    if(this.addEditForm.valid){
      this.addEvent.emit(this.addEditForm.value as Category);
    }
  }
}
