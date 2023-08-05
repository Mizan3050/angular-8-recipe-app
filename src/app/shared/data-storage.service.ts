import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService) {
  }

  createRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'https://recipe-angular-98507-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(res => {
        console.log(res);
      });
    const shoppingList = this.shoppingListService.getIngredients();

    this.http.put(
      'https://recipe-angular-98507-default-rtdb.firebaseio.com/ingredient.json', shoppingList)
      .subscribe(res => {
        console.log(res);
      });
  }

  retrieveIngredients() {
    return this.http.get<Ingredient[]>(
      'https://recipe-angular-98507-default-rtdb.firebaseio.com/ingredient.json')
  }

  retrieveRecipes() {
    return this.http.get<Recipe[]>(
      'https://recipe-angular-98507-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        }));
  }
}
