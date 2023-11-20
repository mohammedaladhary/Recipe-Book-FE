import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodType } from 'src/app/models/FoodType.model';
import { Recipe } from 'src/app/models/Recipe.model';
import { FoodTypeService } from 'src/app/services/food-type.service';

@Component({
  selector: 'app-food-type-list',
  templateUrl: './food-type-list.component.html',
  styleUrls: ['./food-type-list.component.css']
})
export class FoodTypeListComponent implements OnInit {
  foodTypes: FoodType[] = [];

  constructor(private foodTypeService: FoodTypeService, private router: Router) {}

  ngOnInit(): void {
    this.loadFoodTypes();
  }

  loadFoodTypes(): void {
    this.foodTypeService.getAllFoodType().subscribe({
      next: (data) => {
        this.foodTypes = data;
        console.log('FoodTypes data:', this.foodTypes);
      },
      error: (error) => {
        console.error('Error fetching dataTypes:', error);
      }
  })
  }

  onRecipesChange(recipes: Recipe[]): void {
    // Handle recipes change here
    console.log('Recipes have changed:', recipes);
  }
}