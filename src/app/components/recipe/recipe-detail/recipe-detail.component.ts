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
  isUpdatePopupOpen: boolean = false;
  updatedRecipe: any = {};

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}
  openUpdatePopup(recipe: any): void {
    this.isUpdatePopupOpen = true;
    this.updatedRecipe = { ...recipe };
  }

  closeUpdatePopup(): void {
    this.isUpdatePopupOpen = false;
  }

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

  updateRecipe(updatedRecipe: any): void {
    this.recipeService.updateRecipe(updatedRecipe.recipeId, updatedRecipe).subscribe({
      next: (response) => {
        console.log('Recipe updated successfully:', response);
  
        // Update the recipes array with the updated recipe
        this.recipeDetails = this.recipeDetails.map((recipe) =>
          recipe.recipeId === updatedRecipe.recipeId ? updatedRecipe : recipe
        );
  
        // Close the update popup
        this.closeUpdatePopup();
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
