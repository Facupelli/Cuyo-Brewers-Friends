import { RecipeActions } from "../actions/RecipesActions";
import { ActionType } from "../actions/RecipesActionsTypes";
import {  RecipeList } from "./types";

export interface InitialState {
    loading: boolean;
    user: string[];
    recipesList: RecipeList[];
  }

const initialState: InitialState = {
    loading: false,
    user: [],
    recipesList: [],
}

export const recipesReducer = (state: InitialState = initialState, action: RecipeActions) : InitialState=> {
    switch(action.type) {
        case ActionType.RECIPES_FAIL:
            return {
                ...state,
                loading: false,
            }
        case ActionType.RECIPES_LOADING:
            return{
                ...state,
                loading: true,
            }
        case ActionType.RECIPES_GET:
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