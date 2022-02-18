import { ProductsActions } from "../actions/ProductsActions";
import { ProductsActionType } from "../actions/ActionsTypes";
import { Product, ProductList } from "./types";

export interface InitialState {
  loading: boolean;
  productsList: Product[];
  topProductList: ProductList[];
}

const initialState: InitialState = {
  loading: false,
  productsList: [],
  topProductList: [],
};

export const productsReducer = (
  state: InitialState = initialState,
  action: ProductsActions
): InitialState => {
  switch (action.type) {
    case ProductsActionType.PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case ProductsActionType.PRODUCTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ProductsActionType.PRODUCTS_GET:
      return {
        ...state,
        loading: false,
        productsList: action.payload,
      };
    case ProductsActionType.PRODUCTS_GET_TOP:
      return {
        ...state,
        loading: false,
        topProductList: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
