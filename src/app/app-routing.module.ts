import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { AddFoodtypeComponent } from './components/add-foodtype/add-foodtype.component';
import { FoodTypeListComponent } from './components/food-type-list/food-type-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuardService],
    component: HomeComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signout',
    component: SignupComponent
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
    // canActivate: [AuthGuardService],
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
