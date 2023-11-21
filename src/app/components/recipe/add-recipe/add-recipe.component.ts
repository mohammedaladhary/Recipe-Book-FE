import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodType } from 'src/app/models/FoodType.model';
import { FoodTypeService } from 'src/app/services/food-type.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  newRecipe: any;
  recipeCreated: boolean = false;
  message: string = '';
  messageColor: string = '';
  foodType: FoodType[] = []; // Store the list of food types

  recipeForm: FormGroup;
  recipeNameInput: FormControl;
  caloriesInput: FormControl;
  descriptionInput: FormControl;
  foodTypeNameInput: FormControl;

  constructor(private foodTypeService: FoodTypeService, private recipeService: RecipeService, router: Router) {
    this.recipeNameInput = new FormControl("", Validators.required);
    this.caloriesInput = new FormControl("", Validators.required);
    this.descriptionInput = new FormControl("", Validators.required);
    this.foodTypeNameInput = new FormControl("", Validators.required);

    this.recipeForm = new FormGroup({
      recipeName: this.recipeNameInput,
      calories: this.caloriesInput,
      description: this.descriptionInput,
      foodTypeName: this.foodTypeNameInput
    });
  }

  ngOnInit(): void {
    this.loadFoodTypes();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    const userId = currentUser?.userId;
    console.log('UserId:', userId);

    this.newRecipe = {
      user: {
        userId: userId,
      },
    }
  }

  createRecipe(): void {
    // Add recipe form values to newRecipe
    this.newRecipe = {
      ...this.newRecipe,
      ...this.recipeForm.value
    };

    this.recipeService.addRecipe(this.newRecipe).subscribe({
      next: (response) => {
        console.log('New recipe created successfully:', response);
        this.message = 'Recipe created successfully';
        this.messageColor = 'green';
        this.recipeForm.reset(); // Reset the form after successful creation
      },
      error: (error) => {
        console.error('Error creating recipe:', error);
        this.message = 'Recipe not created successfully';
        this.messageColor = 'red';
      },
      complete: () => {
        console.log('Create recipe operation completed');
      }
    });
  }

  loadFoodTypes(): void {
    this.foodTypeService.getAllFoodType().subscribe({
      next: (response) => {
        this.foodType = response;
        console.log('FoodTypes data:', this.foodType);
      },
      error: (error) => {
        console.error('Error fetching food types:', error);
      }
    });
  }
}