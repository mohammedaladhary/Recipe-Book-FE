import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly apiUrl = 'http://localhost:5005/auth';

  constructor(private authService: AuthService,private http: HttpClient) {}

  getAllRecipes(): Observable<any[]> {
    const url = `${this.apiUrl}/recipes`;
    return this.http.get<any[]>(url);
  }

  // addRecipe(newRecipe: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/recipes/new`, newRecipe)
  // }
  addRecipe(recipeData: any): Observable<any> {
    // Get the current user's information
    const currentUser = this.authService.getCurrentUser();
  
    // Set the userId and foodTypeId in the recipeData
    recipeData.user = {
      userId: currentUser.userId,
      // Other user properties...
    };
    recipeData.foodType = {
      foodTypeId: 1, // Set the appropriate foodTypeId
      foodTypeName: recipeData.foodTypeName, // Use the entered foodTypeName
      recipes: [], // Initialize with an empty array
    };
  
    // Now, send the request to create the recipe
    return this.http.post(`${this.apiUrl}/recipes/new`, recipeData);
  }

  updateRecipe(recipeId: number | null, updatedRecipe: any): Observable<any> {
    const url = `${this.apiUrl}/recipes/update/${recipeId}`;
    return this.http.put(url, updatedRecipe);
  }

  deleteRecipe(recipeId: number | null): Observable<any> {
    const url = `${this.apiUrl}/recipes/delete/${recipeId}`;
    return this.http.delete(url);
  }
  
}