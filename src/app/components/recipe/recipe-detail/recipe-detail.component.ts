import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/Recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  recipeDetails: Recipe[] = [];
  recipeId: number = 0;
  isUpdating: boolean = false;
  updatedRecipe: any = {};

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipeId = Number(this.route.snapshot.paramMap.get('recipeId'))
    this.getRecipebyId(this.recipeId)
    console.log(this.recipeId)
  }

  getRecipebyId(recipeId: number){
    this.recipeService.getRecipeById(recipeId).subscribe({
      next:(recipe)=>{
        this.recipeDetails = [recipe]
        console.log(recipe)
    },
  })
}

  deleteRecipe(recipeId: number | null): void {
    // Call the deleteRecipe method from RecipeService
    this.recipeService.deleteRecipe(recipeId).subscribe({
      next: (response) => {
        console.log('Recipe deleted successfully:', response);

        // Update the recipes array without the deleted recipe
        this.recipeDetails = this.recipeDetails.filter((recipe) => recipe.recipeId !== recipeId);
      },
      error: (error) => {
        console.error('Error deleting recipe:', error);
      },
      complete: () => {
        console.log('Delete recipe operation completed');
      }
    });
  }

  startUpdate(recipe: Recipe): void {
    this.isUpdating = true;
    this.updatedRecipe = { ...recipe };
  }

  cancelUpdate(): void {
    this.isUpdating = false;
    this.updatedRecipe = {};
  }

  updateRecipe(): void {
    this.recipeService.updateRecipe(this.updatedRecipe.recipeId, this.updatedRecipe).subscribe({
      next: (response) => {
        console.log('Recipe updated successfully:', response);
        this.recipeDetails = this.recipeDetails.map((recipe) =>
          recipe.recipeId === this.updatedRecipe.recipeId ? response : recipe
        );
        this.isUpdating = false;
        this.updatedRecipe = {};
      },
      error: (error) => {
        console.error('Error updating recipe:', error);
      },
      complete: () => {
        console.log('Update recipe operation completed');
      }
    });
  }  
}
