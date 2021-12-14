// import { Dispatch } from "redux";
// import axios from 'axios';
// import {
//   RecipeActions,
//   RECIPES_FAIL,
//   RECIPES_LOADING,
//   RECIPES_SUCCESS,
// } from "./RecipesActionsTypes";

// export const getRecipe =
//   () => async (dispatch: Dispatch<RecipeActions>) => {
//     try {
//       dispatch({
//         type: RECIPES_LOADING,
//       });

//       const res = await axios.get('/recipes')

//       return dispatch({
//           type: RECIPES_SUCCESS,
//           payload: res.data,
//       })
//     } catch (e) {
//         dispatch({
//             type: RECIPES_FAIL
//         })
//     }
//   };

import {ActionType} from './RecipesActionsTypes'
export interface RecipesLoadingAction {
  type: ActionType.RECIPES_LOADING;
}

export interface RecipesFailAction {
  type: ActionType.RECIPES_FAIL;
}

export interface RecipesSuccessAction {
  type: ActionType.RECIPES_SUCCESS;
  payload: [];
}

export type RecipeActions = RecipesFailAction | RecipesLoadingAction | RecipesSuccessAction;
