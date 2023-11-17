import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  newRecipe: any = [];
  recipeCreated: boolean = false;
  message: string = '';
  messageColor: string = '';

  // Corrected the assignment here
  recipeForm: FormGroup;
  recipeNameInput: FormControl;
  caloriesInput: FormControl;
  descriptionInput: FormControl;
  foodTypeNameInput: FormControl;

  constructor(private recipeService: RecipeService) {
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

  createRecipe(): void {
    const recipeData = this.recipeForm.value;
    this.recipeService.addRecipe(recipeData).subscribe({
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
}