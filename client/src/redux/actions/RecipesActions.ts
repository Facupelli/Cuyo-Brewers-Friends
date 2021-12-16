

import { Recipe } from '../reducers/types';
import {RecipesActionType} from './ActionsTypes'

export interface RecipesLoadingAction {
  type: RecipesActionType.RECIPES_LOADING;
}

export interface RecipesFailAction {
  type: RecipesActionType.RECIPES_FAIL;
}

// export interface Data {
//   entries_per_page: number;
//   filters: any;
//   page: number;
//   recipes: Recipe[];
// }
export interface RecipesGetAction {
  type: RecipesActionType.RECIPES_GET;
  payload: any;
}

export type RecipeActions = RecipesFailAction | RecipesLoadingAction | RecipesGetAction;
