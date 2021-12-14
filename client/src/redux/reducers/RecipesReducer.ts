import { RecipeActions } from "../actions/RecipesActions";
import { ActionType } from "../actions/RecipesActionsTypes";

export interface Recipes {
    id: number;
    name: string;
    style: string;
    brewery: string;
    fermented: string;
}

interface DefaultStateI {
    loading: boolean,
    user: string[],
    recipes: Recipes[],
}

const defaultState: DefaultStateI = {
    loading: false,
    user: [],
    recipes: [],
}

export const recipesReducer = (state: DefaultStateI = defaultState, action: RecipeActions) : DefaultStateI=> {
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