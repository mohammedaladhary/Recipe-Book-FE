import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';
import { FoodType } from 'src/app/models/FoodType.model';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  recipes!: any[];
  selectedRecipe: any;
  
  // Use @Input decorator to receive data from parent component
  @Input() data: any;
  
  constructor(private recipeService: RecipeService, private router: Router) {}
    
  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe(
      (data) => {
        this.recipes = data;
        console.log('Recipes data:', this.recipes);
      },
      (error) => {
        console.error('Error fetching recipes:',error);
      }
    );
  }

  onSelect(recipe: any): void {
    this.selectedRecipe=recipe;
    this.router.navigate(['/recipes',recipe._recipeId]);
  }
}
