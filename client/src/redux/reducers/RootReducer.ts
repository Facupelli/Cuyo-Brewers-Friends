import {combineReducers} from 'redux'
import recipesReducer from './RecipesReducer';

export const RootReducer = combineReducers({
    storeRecipes: recipesReducer
});

export type RootState = ReturnType<typeof RootReducer>; // retunrtype type of TS 

