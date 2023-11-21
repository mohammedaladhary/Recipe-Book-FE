// food-type-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodType } from 'src/app/models/FoodType.model';
import { FoodTypeService } from 'src/app/services/food-type.service';

@Component({
  selector: 'app-food-type-detail',
  templateUrl: './food-type-detail.component.html',
  styleUrls: ['./food-type-detail.component.css']
})
export class FoodTypeDetailComponent implements OnInit {
  foodType: FoodType;

  constructor(private foodTypeService: FoodTypeService, private route: ActivatedRoute) {
    this.foodType = new FoodType (null,'',[]);
  }

  ngOnInit(): void {
    this.reloadFoodType();
  }  

  reloadFoodType(): void {
    const foodTypeId: number | null = this.route.snapshot.params['foodTypeId'];
    if (foodTypeId !== null){
      this.foodTypeService.getFoodTypeById(foodTypeId).subscribe({
        next: (foodType: FoodType) => {
          this.foodType = foodType;
        },
        error: (error) => {
          console.log(error)
        }
      });
    }
  }

  deleteFoodType(): void {
    this.foodTypeService.deleteFoodType(this.foodType.foodTypeId).subscribe({
      next: (response) => {
        console.log('FoodType deleted successfully:', response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // updateFoodType(): void {
  //   // Assuming you have a property called foodTypeName in your foodType object
  //   if (this.selectedFoodType) {
  //     this.selectedFoodType.foodTypeName = this.updatedFoodTypeName;

  //     // Call the updateFoodType method from FoodTypeService
  //     this.foodTypeService.updateFoodType(this.foodTypeId, this.selectedFoodType).subscribe({
  //       next: (response) => {
  //         console.log('FoodType updated successfully:', response);
  //       },
  //       error: (error) => {
  //         console.error('Error updating FoodType:', error);
  //       },
  //       complete: () => {
  //         console.log('Update FoodType operation completed');
  //       }
  //     });
  //   }
  // }
}