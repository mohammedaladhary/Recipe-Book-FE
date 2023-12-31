import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Recipe } from '../models/Recipe.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly apiUrl = 'http://localhost:5005/auth';

  constructor(private authService: AuthService,private http: HttpClient) {}

  getAllRecipes(): Observable<any> {
    const url = `${this.apiUrl}/recipes`;
    return this.http.get<any[]>(url);
  }

  getRecipeById(recipeId: number): Observable<Recipe> {
    const url = `${this.apiUrl}/recipes/${recipeId}`;
    return this.http.get<Recipe>(url);
  }  

  addRecipe(newRecipe: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recipes/new`, newRecipe)
  }

  addRecipeWithFoodType(recipe: Recipe): Observable<Recipe> {
    const url = `${this.apiUrl}/recipes/new`;
    return this.http.post<Recipe>(url, recipe);
  }

  updateRecipe(recipeId: number | null, updatedRecipe: any): Observable<any> {
    const url = `${this.apiUrl}/recipes/update/${recipeId}`;
    return this.http.put(url, updatedRecipe);
  }

  deleteRecipe(recipeId: number | null): Observable<any> {
    const url = `${this.apiUrl}/recipes/delete/${recipeId}`;
    return this.http.delete(url);
  }

  private getAuthHeader(): HttpHeaders {
    // Get the token from the local storage
    const token: string | null = localStorage.getItem('authToken');
    if (token === null) {
      throw null;
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}