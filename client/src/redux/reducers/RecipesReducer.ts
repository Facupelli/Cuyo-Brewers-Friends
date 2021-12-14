import { RecipeActions } from "../actions/RecipesActions";
import { ActionType } from "../actions/RecipesActionsTypes";
import { Recipe } from "./types";

export interface InitialState {
    loading: boolean;
    user: string[];
    recipes: Recipe[];
  }

const initialState: InitialState = {
    loading: false,
    user: [],
    recipes: [],
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
                recipes: action.payload
            }
        default:
            return state;
    }
};

export default recipesReducer;