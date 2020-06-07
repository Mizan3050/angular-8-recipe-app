import {Ingredient} from '../../shared/ingredient.model';
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  ShoppingListActions,
  START_EDIT,
  STOP_EDIT,
  UPDATE_INGREDIENT
} from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {...state, ingredients: [...state.ingredients, action.payload]};
    case ADD_INGREDIENTS:
      return {...state, ingredients: [...state.ingredients, ...action.payload]};
    case UPDATE_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients.slice(0, state.editedIngredientIndex),
          action.payload,
          ...state.ingredients.slice(state.editedIngredientIndex + 1)
        ],
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients.slice(0, state.editedIngredientIndex)
            .concat(...state.ingredients.slice(state.editedIngredientIndex + 1, state.ingredients.length))
        ],
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
      };
    case STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    default:
      return state;
  }
}
