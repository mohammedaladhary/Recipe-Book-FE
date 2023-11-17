import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodTypeService } from 'src/app/services/food-type.service';

@Component({
  selector: 'app-food-type-list',
  templateUrl: './food-type-list.component.html',
  styleUrls: ['./food-type-list.component.css']
})
export class FoodTypeListComponent implements OnInit{
  foodType!: any[];
  selectedFoodType: any;

  constructor(private foodTypeService: FoodTypeService, private router : Router){
    
  }
  ngOnInit(): void {
    this.foodTypeService.getAllFoodType().subscribe(
      (data) => {
        this.foodType = data;
        console.log('FoodTypes data:', this.foodType);
    },
    (error) => {
      console.error('Error fetching dataTypes:',error)
    }
    );
}

onSelect(foodType:any): void {
  this.selectedFoodType=foodType;
  this.router.navigate(['/foodTypes',foodType._foodTypeId]);
}
}
