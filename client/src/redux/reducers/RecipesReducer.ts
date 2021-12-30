import { RecipeActions } from "../actions/RecipesActions";
import { RecipesActionType } from "../actions/ActionsTypes";
import {  RecipeList } from "./types";

export interface InitialState {
    loading: boolean;
    recipesList: RecipeList[];
    topRecipesList: RecipeList[],
  }

const initialState: InitialState = {
    loading: false,
    recipesList: [],
    topRecipesList : [],
}

export const recipesReducer = (state: InitialState = initialState, action: RecipeActions) : InitialState=> {
    switch(action.type) {
        case RecipesActionType.RECIPES_FAIL:
            return {
                ...state,
                loading: false,
            }
        case RecipesActionType.RECIPES_LOADING:
            return{
                ...state,
                loading: true,
            }
        case RecipesActionType.RECIPES_GET:
            return{
                ...state,
                loading: false,
                recipesList: action.payload
            }
        case RecipesActionType.RECIPES_GET_TOP:
            return{
                ...state,
                loading: false,
                topRecipesList: action.payload
            }
        default:
            return state;
    }
};

export default recipesReducer;