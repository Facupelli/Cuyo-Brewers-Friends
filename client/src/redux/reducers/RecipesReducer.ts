import { RecipeActions } from "../actions/RecipesActions";
import { ActionType } from "../actions/RecipesActionsTypes";

interface DefaultStateI {
    loading: boolean,
    user: string[],
    recipes: string[],
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
        case ActionType.RECIPES_SUCCESS:
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