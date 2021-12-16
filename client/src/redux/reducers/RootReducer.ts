import {combineReducers} from 'redux'
import recipesReducer from './RecipesReducer';
import userReducer from './UserReducer';

export const RootReducer = combineReducers({
    storeRecipes: recipesReducer,
    storeUser: userReducer
});

export type RootState = ReturnType<typeof RootReducer>; // retunrtype type of TS 

