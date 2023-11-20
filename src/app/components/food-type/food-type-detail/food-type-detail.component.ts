// food-type-detail.component.ts

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodType } from 'src/app/models/FoodType.model';
import { Recipe } from 'src/app/models/Recipe.model';
import { FoodTypeService } from 'src/app/services/food-type.service';

@Component({
  selector: 'app-food-type-detail',
  templateUrl: './food-type-detail.component.html',
  styleUrls: ['./food-type-detail.component.css']
})
export class FoodTypeDetailComponent implements OnInit {
  selectedFoodType: FoodType | null = null;
  updatedFoodTypeName: string = ''; // Track the updated food type name
  @Input() foodTypeId: number | null = null;
  @Output() recipesChange = new EventEmitter<Recipe[]>();
  recipes: Recipe[] = [];
  foodTypeDetails: FoodType[] = [];

  constructor(private foodTypeService: FoodTypeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.foodTypeId = Number(this.route.snapshot.paramMap.get('foodTypeId'))
    this.getFoodTypeById(this.foodTypeId);
    console.log(this.foodTypeId)
  }  

  getFoodTypeById(foodTypeId: number): void {
    this.foodTypeService.getFoodTypeById(foodTypeId).subscribe({
      next: (foodType) => {
        this.selectedFoodType = foodType;
        // If you need to load associated recipes, you can call the method here
        this.loadRecipes();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  
  loadRecipes(): void {
    if (this.selectedFoodType) {
      this.foodTypeService.getRecipesByFoodTypeId(this.foodTypeId ?? 0).subscribe({
        next: (recipes) => {
          this.recipes = recipes || [];
          this.recipesChange.emit(this.recipes);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  deleteFoodType(): void {
    this.foodTypeService.deleteFoodType(this.foodTypeId).subscribe({
      next: (response) => {
        console.log('FoodType deleted successfully:', response);
        // Emit an event to notify the parent about the deletion
        this.recipesChange.emit([]);
      },
      error: (error) => {
        console.log('Error deleting FoodType:', error);
      }
    });
  }

  updateFoodType(): void {
    // Assuming you have a property called foodTypeName in your foodType object
    if (this.selectedFoodType) {
      this.selectedFoodType.foodTypeName = this.updatedFoodTypeName;

      // Call the updateFoodType method from FoodTypeService
      this.foodTypeService.updateFoodType(this.foodTypeId, this.selectedFoodType).subscribe({
        next: (response) => {
          console.log('FoodType updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating FoodType:', error);
        },
        complete: () => {
          console.log('Update FoodType operation completed');
        }
      });
    }
  }
}