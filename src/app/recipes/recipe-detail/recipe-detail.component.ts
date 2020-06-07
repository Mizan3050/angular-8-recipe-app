import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import * as App from '../../store/appReducer';
import {Store} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import * as RecipeReducer from '../store/recipe.reducer';
import {DeleteRecipeAction} from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private store: Store<App.AppState>) {
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      map((params: Params) => {
        return +params.id;
      }),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipes');
      }),
      map((recipeState: RecipeReducer.State) => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        });
      })
    ).subscribe(recipe => {
      this.recipe = recipe;
    });
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipeAction(this.id));
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
