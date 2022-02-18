import {combineReducers} from 'redux'
import recipesReducer from './RecipesReducer';
import userReducer from './UserReducer';
import blogReducer from './BlogReducer';
import productsReducer from './ProductsReducer'

export const RootReducer = combineReducers({
    storeRecipes: recipesReducer,
    storeUser: userReducer,
    storeBlog: blogReducer,
    storeProducts: productsReducer,
});

export type RootState = ReturnType<typeof RootReducer>; // retunrtype type of TS 

