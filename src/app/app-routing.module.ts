import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { AddFoodtypeComponent } from './components/add-foodtype/add-foodtype.component';
import { FoodTypeListComponent } from './components/food-type-list/food-type-list.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent
  },
  {
    path: 'home',
    // canActivate: [AuthGuardService],
    component: HomeComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signout',
    component: SigninComponent
  },
  {
    path: 'add-foodType',
    // canActivate: [AuthGuardService],
    component: AddFoodtypeComponent
  },
  {
    path: 'foodType',
    // canActivate: [AuthGuardService],
    component: FoodTypeListComponent
  },
  {
    path: 'add-recipe',
    // canActivate: [AuthGuardService],
    component: AddRecipeComponent
  },
  {
    path: 'recipes',
    // canActivate: [AuthGuardService],
    component: RecipeListComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
