import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodTypeService } from 'src/app/services/food-type.service';

@Component({
  selector: 'app-add-foodtype',
  templateUrl: './add-foodtype.component.html',
  styleUrls: ['./add-foodtype.component.css']
})
export class AddFoodtypeComponent {
  newFoodType: any = {};
  foodTypeCreated: boolean = false;

  foodTypeForm: FormGroup;
  foodTypeNameInput: FormControl;

  constructor(private foodTypeService: FoodTypeService) {
    this.foodTypeNameInput = new FormControl("",Validators.required);
    this.foodTypeForm = new FormGroup ({
      foodTypeName:this.foodTypeNameInput
  });
  }
  createFoodType() {
    const foodTypeData = this.foodTypeForm.value;
    this.foodTypeService.addFoodType(foodTypeData).subscribe({
      next: (response) => {
        console.log('New food type created successfully:', response);
        this.newFoodType = response;
        this.foodTypeCreated = true;
      },
      error: (error) => {
        console.error('Error creating food type:', error);
        this.foodTypeCreated = false;
      },
      complete: () => {
        console.log('Create food type operation completed');
      }
    });
  }
}