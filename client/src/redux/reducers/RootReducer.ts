import {combineReducers} from 'redux'
import recipesReducer from './RecipesReducer';
import userReducer from './UserReducer';
import blogReducer from './BlogReducer';

export const RootReducer = combineReducers({
    storeRecipes: recipesReducer,
    storeUser: userReducer,
    storeBlog: blogReducer,
});

export type RootState = ReturnType<typeof RootReducer>; // retunrtype type of TS 

