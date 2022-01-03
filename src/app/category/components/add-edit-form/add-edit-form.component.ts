import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.scss']
})
export class AddEditFormComponent implements OnInit {

 
  addEditForm: FormGroup;

  id: string;
  isEditMode: boolean;
  isLoading: boolean = false;
  isSubmitted: boolean = false;

  idSubscription: Subscription;

  @Output('addCategoryEvent') addCategoryEvent = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService) {
    
   }

  ngOnInit(): void {

    this.idSubscription = this.route.paramMap.subscribe({
      next: (params: any)=>{
        
        this.id = params.get('id');

        if(this.id){
          this.isEditMode = true;
        }else{
          this.isEditMode = false;
        }
        
      },
      error: (err)=>{
        console.log(err);
      }
    });

    this.createForm();
  }

  ngOnDestroy(): void {
      if(this.idSubscription)
        this.idSubscription.unsubscribe();
  }

  createForm(){
    this.addEditForm = this.fb.group({
      categoryName: ['', [Validators.required]]
    });
  }

  onSubmit(){

    if(this.addEditForm.valid){
      
      if(this.isEditMode){
        this.edit();
      } else {
        this.add();
      }

    }
    return;
  }

  private add(){
    this.addCategoryEvent.emit(this.addEditForm.value);
  }

  private edit(){
    console.log("EDIT - ", this.addEditForm.value);
  }

}
