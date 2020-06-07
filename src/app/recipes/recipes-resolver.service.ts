import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Recipe} from './recipe.model';
import * as App from '../store/appReducer';
import {Store} from '@ngrx/store';
import {RetrieveRecipesAction, SET_RECIPES} from './store/recipe.actions';
import {Actions, ofType} from '@ngrx/effects';
import {map, switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private store: Store<App.AppState>,
              private actions$: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    return this.store.select('recipes').pipe(
      take(1),
      map(recipesState => recipesState.recipes),
      switchMap(recipes => {
        if (recipes.length) {
          this.store.dispatch(new RetrieveRecipesAction());
          return this.actions$.pipe(
            ofType(SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );
  }

}
