import { Component} from '@angular/core';
import { Recipe } from 'src/app/models/Recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}
  
  ngOnInit(): void {
    this.getAllRecipes()
  }

  getAllRecipes(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (recipe) =>{
        this.recipes = recipe;
      },
      error: 
      (error) => {
        console.log(error);
      }
  })
  }
}