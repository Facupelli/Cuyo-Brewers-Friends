import { Dispatch } from "redux";
import axios, { AxiosResponse } from "axios";
// import {
//   RecipeActions,
//   RECIPES_FAIL,
//   RECIPES_LOADING,
//   RECIPES_SUCCESS,
// } from "./RecipesActionsTypes";

import { ActionType } from "../actions/RecipesActionsTypes";
import {RecipeActions} from '../actions/RecipesActions'
import { Recipes } from "../reducers/RecipesReducer";

export const loadingTrue = () => {
  return (dispatch: Dispatch<RecipeActions>) => {
    dispatch({
      type: ActionType.RECIPES_LOADING,
    });
  };
};

export const getRecipes = () => async (dispatch: Dispatch<RecipeActions>) => {
  try {
    dispatch({
      type: ActionType.RECIPES_LOADING,
    });

    

    const res  = await axios.get<Recipes[]>("/recipes");


    return dispatch({
      type: ActionType.RECIPES_GET,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ActionType.RECIPES_FAIL,
    });
  }
};
