import { Dispatch } from "redux";
import axios from "axios";
import { RecipesActionType, UserActionType } from "../actions/ActionsTypes";
import { RecipeActions } from "../actions/RecipesActions";
import { UserActions } from "../actions/UserActions";

export const loadingTrue = () => {
  return (dispatch: Dispatch<RecipeActions>) => {
    dispatch({
      type: RecipesActionType.RECIPES_LOADING,
    });
  };
};

export const getRecipes = () => async (dispatch: Dispatch<RecipeActions>) => {
  try {
    dispatch({
      type: RecipesActionType.RECIPES_LOADING,
    });

    const res = await axios.get<any>("/recipes");

    return dispatch({
      type: RecipesActionType.RECIPES_GET,
      payload: res.data.recipesList,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: RecipesActionType.RECIPES_FAIL,
    });
  }
};

export const setCookie = (cookie: string) => {
  return (dispatch: Dispatch<UserActions>) => {
    dispatch({
      type: UserActionType.SET_COOKIE,
      payload: cookie
    });
  };
};
