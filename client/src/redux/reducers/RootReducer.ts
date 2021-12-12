import {combineReducers} from 'redux'
import recipesReducer from './RecipesReducer';

const RootReducer = combineReducers({
    recipes: recipesReducer
});

export default RootReducer;

