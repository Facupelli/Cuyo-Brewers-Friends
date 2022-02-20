import { Recipe, RecipeList } from "../reducers/types";
import { RecipesActionType } from "./ActionsTypes";

export interface RecipesLoadingAction {
  type: RecipesActionType.RECIPES_LOADING;
}

export interface RecipesFailAction {
  type: RecipesActionType.RECIPES_FAIL;
}

export interface TotalNumRecipes {
  type: RecipesActionType.TOTAL_NUM_RECIPES;
  payload: number;
}
// export interface Data {
//   entries_per_page: number;
//   filters: any;
//   page: number;
//   recipes: Recipe[];
// }
export interface RecipesGetAction {
  type: RecipesActionType.RECIPES_GET;
  payload: RecipeList[];
}

export interface LoadMoreRecipesAction {
  type: RecipesActionType.LOAD_MORE_RECIPES;
  payload: RecipeList[];
}

export interface RecipesGetTopAction {
  type: RecipesActionType.RECIPES_GET_TOP;
  payload: RecipeList[];
}

export type RecipeActions =
  | RecipesFailAction
  | RecipesLoadingAction
  | RecipesGetAction
  | RecipesGetTopAction
  | LoadMoreRecipesAction
  | TotalNumRecipes;
