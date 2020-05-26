import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  createRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'https://ng-recipe-book-7d270.firebaseio.com/recipes.json', recipes)
      .subscribe(res => {
        console.log(res);
      });
  }

  retrieveRecipes() {
    return this.http.get<Recipe[]>(
      'https://ng-recipe-book-7d270.firebaseio.com/recipes.json')
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
