import {Actions, Effect, ofType} from '@ngrx/effects';
import {CREATE_RECIPE, RETRIEVE_RECIPES, SetRecipesAction} from './recipe.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as App from '../../store/appReducer';

@Injectable()
export class RecipeEffects {

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<App.AppState>) {
  }

  @Effect()
  retrieveRecipes = this.actions$.pipe(
    ofType(RETRIEVE_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://ng-recipe-book-7d270.firebaseio.com/recipes.json');
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new SetRecipesAction(recipes);
    })
  );

  @Effect({dispatch: false})
  createRecipes = this.actions$.pipe(
    ofType(CREATE_RECIPE),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put('https://ng-recipe-book-7d270.firebaseio.com/recipes.json', recipesState.recipes);
    })
  );
}
