import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe/recipe-detail/recipe-detail.component';
import { AddRecipeComponent } from './components/recipe/add-recipe/add-recipe.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddFoodtypeComponent } from './components/food-type/add-foodtype/add-foodtype.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { FoodTypeListComponent } from './components/food-type/food-type-list/food-type-list.component';
import { FoodTypeDetailComponent } from './components/food-type/food-type-detail/food-type-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    AddRecipeComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    NavBarComponent,
    AddFoodtypeComponent,
    PageNotFoundComponent,
    FoodTypeListComponent,
    FoodTypeDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    // MatInputModule,
    // MatFormFieldModule,
    // MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
