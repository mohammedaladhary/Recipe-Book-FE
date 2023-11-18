import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes!: any[];
  selectedRecipe: any;
  isUpdatePopupOpen: boolean = false;
  updatedRecipe: any = {};

  // Use @Input decorator to receive data from parent component
  @Input() data: any;

  constructor(private recipeService: RecipeService, private router: Router) {}
  openUpdatePopup(recipe: any): void {
    this.isUpdatePopupOpen = true;
    this.updatedRecipe = { ...recipe };
  }

  closeUpdatePopup(): void {
    this.isUpdatePopupOpen = false;
  }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(
      (data) => {
        this.recipes = data;
        console.log('Recipes data:', this.recipes);
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }

  onSelect(recipe: any): void {
    this.selectedRecipe = recipe;
    this.router.navigate(['/recipes', recipe._recipeId]);
  }

  deleteRecipe(recipeId: number | null): void {
    // Call the deleteRecipe method from RecipeService
    this.recipeService.deleteRecipe(recipeId).subscribe({
      next: (response) => {
        console.log('Recipe deleted successfully:', response);

        // Update the recipes array without the deleted recipe
        this.recipes = this.recipes.filter((recipe) => recipe.recipeId !== recipeId);
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
        this.recipes = this.recipes.map((recipe) =>
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