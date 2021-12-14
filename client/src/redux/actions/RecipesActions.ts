

import { Recipes } from '../reducers/RecipesReducer';
import {ActionType} from './RecipesActionsTypes'
export interface RecipesLoadingAction {
  type: ActionType.RECIPES_LOADING;
}

export interface RecipesFailAction {
  type: ActionType.RECIPES_FAIL;
}

export interface RecipesGetAction {
  type: ActionType.RECIPES_GET;
  payload: Recipes[];
}

export type RecipeActions = RecipesFailAction | RecipesLoadingAction | RecipesGetAction;
