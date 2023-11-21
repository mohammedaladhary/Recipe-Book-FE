import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodType } from '../models/FoodType.model';
import { Recipe } from '../models/Recipe.model';

@Injectable({
  providedIn: 'root'
})
export class FoodTypeService {

  private readonly apiUrl = 'http://localhost:5005/auth';

  constructor(private http: HttpClient) {}

  getAllFoodType(): Observable<any[]> {
    const url = `${this.apiUrl}/foodtype`;
    return this.http.get<any[]>(url);
  }

  // getRecipesByFoodTypeId(foodTypeId: number): Observable<Recipe[]> {
  //   const url = `${this.apiUrl}/foodtype/${foodTypeId}/recipes`;
  //   return this.http.get<Recipe[]>(url);
  // }
  getFoodTypeById(foodTypeId: number): Observable<FoodType> {
    const url = `${this.apiUrl}/foodtype/${foodTypeId}`;
    return this.http.get<FoodType>(url);
  }
  
  getRecipesByFoodTypeId(foodTypeId: number): Observable<Recipe[]> {
    const url = `${this.apiUrl}/foodtype/${foodTypeId}/recipes`;
    return this.http.get<Recipe[]>(url);
  }

  addFoodType(newFoodType: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/foodtype/new`, newFoodType)
  }

  updateFoodType(foodTypeId: number | null, updatedFoodType: any): Observable<FoodType> {
    const url = `${this.apiUrl}/foodtype/custom-update/${foodTypeId}`;
    return this.http.patch<FoodType>(url, updatedFoodType);
  }

  deleteFoodType(foodTypeId: number | null): Observable<FoodType> {
    const url = `${this.apiUrl}/foodtype/delete/${foodTypeId}`;
    return this.http.delete<FoodType>(url);
  }
}