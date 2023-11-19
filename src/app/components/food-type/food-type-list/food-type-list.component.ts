// food-type-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodTypeService } from 'src/app/services/food-type.service';

@Component({
  selector: 'app-food-type-list',
  templateUrl: './food-type-list.component.html',
  styleUrls: ['./food-type-list.component.css']
})
export class FoodTypeListComponent implements OnInit {
  foodType!: any[];
  updatedFoodTypeName: string = ''; // Track the updated food type name
  selectedFoodType: any; // Track the selected food type for update

  constructor(private foodTypeService: FoodTypeService, private router: Router) {}

  ngOnInit(): void {
    this.loadFoodTypes();
  }

  loadFoodTypes(): void {
    this.foodTypeService.getAllFoodType().subscribe(
      (data) => {
        this.foodType = data;
        console.log('FoodTypes data:', this.foodType);
      },
      (error) => {
        console.error('Error fetching dataTypes:', error);
      }
    );
  }

  deleteFoodType(foodTypeId: number): void {
    this.foodTypeService.deleteFoodType(foodTypeId).subscribe(
      (response) => {
        console.log('FoodType deleted successfully:', response);
        // Remove the deleted foodType from the local array
        this.foodType = this.foodType.filter((ft) => ft.foodTypeId !== foodTypeId);
      },
      (error) => {
        console.error('Error deleting FoodType:', error);
      }
    );
  }

  updateFoodType(): void {
    if (this.selectedFoodType) {
      // Assuming you have a property called foodTypeName in your foodType object
      this.selectedFoodType.foodTypeName = this.updatedFoodTypeName;

      // Call the updateFoodType method from FoodTypeService
      this.foodTypeService.updateFoodType(this.selectedFoodType.foodTypeId, this.selectedFoodType).subscribe({
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

  onSelect(foodType: any): void {
    this.selectedFoodType = foodType;
    // Set the initial value for the updated food type name
    this.updatedFoodTypeName = foodType.foodTypeName;
  }
}