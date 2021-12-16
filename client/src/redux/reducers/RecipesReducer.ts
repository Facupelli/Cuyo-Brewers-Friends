import { RecipeActions } from "../actions/RecipesActions";
import { RecipesActionType } from "../actions/ActionsTypes";
import {  RecipeList } from "./types";

export interface InitialState {
    loading: boolean;
    recipesList: RecipeList[];
  }

const initialState: InitialState = {
    loading: false,
    recipesList: [],
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
        default:
            return state;
    }
};

export default recipesReducer;