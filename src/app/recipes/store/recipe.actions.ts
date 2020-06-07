import {Action} from '@ngrx/store';
import {Recipe} from '../recipe.model';

export const SET_RECIPES = 'SET_RECIPES';
export const RETRIEVE_RECIPES = 'RETRIEVE_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const CREATE_RECIPE = 'CREATE_RECIPE';

export class SetRecipesAction implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {
  }
}

export class RetrieveRecipesAction implements Action {
  readonly type = RETRIEVE_RECIPES;

  constructor() {
  }
}

export class AddRecipeAction implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {
  }
}

export class UpdateRecipeAction implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { recipe: Recipe, index: number }) {
  }
}

export class DeleteRecipeAction implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {
  }
}

export class CreateRecipeAction implements Action {
  readonly type = CREATE_RECIPE;
}

export type AuthActions =
  SetRecipesAction
  | RetrieveRecipesAction
  | AddRecipeAction
  | UpdateRecipeAction
  | DeleteRecipeAction
  | CreateRecipeAction;
