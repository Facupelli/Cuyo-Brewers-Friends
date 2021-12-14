

import { Recipe } from '../reducers/types';
import {ActionType} from './RecipesActionsTypes'
export interface RecipesLoadingAction {
  type: ActionType.RECIPES_LOADING;
}

export interface RecipesFailAction {
  type: ActionType.RECIPES_FAIL;
}

// export interface Data {
//   entries_per_page: number;
//   filters: any;
//   page: number;
//   recipes: Recipe[];
// }
export interface RecipesGetAction {
  type: ActionType.RECIPES_GET;
  payload: any;
}

export type RecipeActions = RecipesFailAction | RecipesLoadingAction | RecipesGetAction;
