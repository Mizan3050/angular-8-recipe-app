import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  createRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.post('https://ng-recipe-book-7d270.firebaseio.com/recipes.json', recipes).subscribe(res => {
      console.log(res);
    });
  }

  retrieveRecipes() {
    return this.http.get<{ [key: string]: Recipe[] }>('https://ng-recipe-book-7d270.firebaseio.com/recipes.json').pipe(
      map(recipesObject => {
        return recipesObject[Object.keys(recipesObject)[0]].map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }));
  }
}
