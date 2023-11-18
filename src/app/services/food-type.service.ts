import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodType } from '../models/FoodType.model';

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

  addFoodType(newFoodType: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/foodtype/new`, newFoodType)
  }

  updateFoodType(foodTypeId: number | null, updatedFoodType: any): Observable<FoodType> {
    const url = `${this.apiUrl}/foodtype/custom-update/${foodTypeId}`;
    return this.http.patch<FoodType>(url, updatedFoodType);
  }

  deleteFoodType(foodTypeId: number | null): Observable<FoodType> {
    const url = `${this.apiUrl}/foodType/delete/${foodTypeId}`;
    return this.http.delete<FoodType>(url);
  }
}