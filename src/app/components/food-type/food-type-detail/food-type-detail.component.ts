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
  selectedFoodType: any;
  updatedFoodTypeName: string = ''; // Track the updated food type name

  @Input() foodTypeId: number = 0;
  @Output() recipesChange = new EventEmitter<Recipe[]>();
  recipes: Recipe[] = [];

  constructor(private foodTypeService: FoodTypeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.foodTypeService.getRecipesByFoodTypeId(this.foodTypeId).subscribe({
      next: (recipes) => {
        this.recipes = recipes || [];
        this.recipesChange.emit(this.recipes); // Emit recipes to the parent
      },
      error: (error) => {
        console.log(error);
      },
    });
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

    // Clear the selected food type and updated name after update
    this.selectedFoodType = null;
    this.updatedFoodTypeName = '';
  }
}