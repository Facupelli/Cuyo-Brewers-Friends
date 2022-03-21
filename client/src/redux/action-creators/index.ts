import { Dispatch } from "redux";
import axios from "axios";
import {
  RecipesActionType,
  ProductsActionType,
  UserActionType,
  BlogActionType,
} from "../actions/ActionsTypes";
import { RecipeActions } from "../actions/RecipesActions";
import { UserActions } from "../actions/UserActions";
import { BlogActions } from "../actions/BlogActions";
import { ProductsActions } from "../actions/ProductsActions";
import { Blog, ProductsResponse, ProductsTopResponse, RecipeResponse, UserData } from "../reducers/types";

export const loadingTrue = () => {
  return (dispatch: Dispatch<RecipeActions>) => {
    dispatch({
      type: RecipesActionType.RECIPES_LOADING,
    });
  };
};

export const totalNumRecipes =
  () => async (dispatch: Dispatch<RecipeActions>) => {
    try {
      const res = await axios.get<RecipeResponse>("/recipe");

      dispatch({
        type: RecipesActionType.TOTAL_NUM_RECIPES,
        payload: res.data.total_results,
      });
    } catch (e) {
      console.log(e);
    }
  };

type Filters = {
  style: string;
  sub_category: string;
  beer_title: string;
  username: string;
};

export const getRecipes =
  (filters?: Filters) => async (dispatch: Dispatch<RecipeActions>) => {
    try {
      dispatch({
        type: RecipesActionType.RECIPES_LOADING,
      });
      let res: any;

      if (filters) {
        if (filters.username) {
          res = await axios.get<any>(`/recipe?username=${filters.username}`);
          return dispatch({
            type: RecipesActionType.RECIPES_GET,
            payload: res.data.recipesList,
          });
        }
        if (filters.beer_title) {
          res = await axios.get<any>(`/recipe?title=${filters.beer_title}`);
          return dispatch({
            type: RecipesActionType.RECIPES_GET,
            payload: res.data.recipesList,
          });
        }
        if (filters.sub_category) {
          res = await axios.get<any>(
            `/recipe?sub_category=${filters.sub_category}`
          );
        }
      }
      if (!filters) {
        res = await axios.get<any>("/recipe");
      }

      return dispatch({
        type: RecipesActionType.RECIPES_GET,
        payload: res.data.recipesList,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: RecipesActionType.RECIPES_FAIL,
      });
    }
  };

export const loadMoreRecipes =
  (page: number) => async (dispatch: Dispatch<RecipeActions>) => {
    try {
      dispatch({
        type: RecipesActionType.RECIPES_LOADING,
      });
      const res = await axios.get<RecipeResponse>(`/recipe?page=${page}`);

      return dispatch({
        type: RecipesActionType.LOAD_MORE_RECIPES,
        payload: res.data.recipesList,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: RecipesActionType.RECIPES_FAIL,
      });
    }
  };

export const getTopRecipes =
  () => async (dispatch: Dispatch<RecipeActions>) => {
    try {
      let res;

      res = await axios.get<RecipeResponse>("/recipe?top=true");

      return dispatch({
        type: RecipesActionType.RECIPES_GET_TOP,
        payload: res.data.recipesList,
      });
    } catch (e) {}
  };

export const loadMoreTopRecipes =
  (page: number) => async (dispatch: Dispatch<RecipeActions>) => {
    try {
      const res = await axios.get<RecipeResponse>(`/recipe?top=true&page=${page}`);

      return dispatch({
        type: RecipesActionType.LOAD_MORE_TOP_RECIPES,
        payload: res.data.recipesList,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: RecipesActionType.RECIPES_FAIL,
      });
    }
  };

// --------------------------- PRODUCTS ACTIONS

export const productsLoadingTrue = () => {
  return (dispatch: Dispatch<ProductsActions>) => {
    dispatch({
      type: ProductsActionType.PRODUCTS_LOADING,
    });
  };
};

export const getProducts =
  () => async (dispatch: Dispatch<ProductsActions>) => {
    try {
      dispatch({
        type: ProductsActionType.PRODUCTS_LOADING,
      });

      const res = await axios.get<ProductsResponse>("/products");

      return dispatch({
        type: ProductsActionType.PRODUCTS_GET,
        payload: res.data.productsList,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: ProductsActionType.PRODUCTS_FAIL,
      });
    }
  };

export const getTopProducts =
  () => async (dispatch: Dispatch<ProductsActions>) => {
    try {
      let res;

      res = await axios.get<ProductsTopResponse>("/products?top=true");

      return dispatch({
        type: ProductsActionType.PRODUCTS_GET_TOP,
        payload: res.data.productsList,
      });
    } catch (e) {}
  };

// ------------------------ USER ACTIONS

export const setCookie = (cookie: string) => {
  return (dispatch: Dispatch<UserActions>) => {
    dispatch({
      type: UserActionType.SET_COOKIE,
      payload: cookie,
    });
  };
};

export const setShowModal = (value: boolean) => {
  return (dispatch: Dispatch<UserActions>) => {
    dispatch({
      type: UserActionType.SET_SHOW_MODAL,
      payload: value,
    });
  };
};

export const getUserData =
  (id: unknown) => async (dispatch: Dispatch<UserActions>) => {
    try {
      const res = await axios.get<UserData>(`/user?id=${id}`);

      return dispatch({
        type: UserActionType.GET_USER_DATA,
        payload: res.data,
      });
    } catch (e) {}
  };

// ------------------------ BLOG ACTIONS

export const getBlogs =
  (article_username?: string, article_title?: string) =>
  async (dispatch: Dispatch<BlogActions>) => {
    try {
      if (article_username) {
        const res = await axios.get<Blog[]>(`/blog?username=${article_username}`);
        return dispatch({
          type: BlogActionType.GET_BLOGS,
          payload: res.data,
        });
      }

      if (article_title) {
        const res = await axios.get<Blog[]>(`/blog?title=${article_title}`);
        return dispatch({
          type: BlogActionType.GET_BLOGS,
          payload: res.data,
        });
      }

      const res = await axios.get<Blog[]>("/blog");

      return dispatch({
        type: BlogActionType.GET_BLOGS,
        payload: res.data,
      });
    } catch (e) {}
  };
