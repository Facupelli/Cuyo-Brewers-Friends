

import { Product, ProductList } from '../reducers/types';
import {ProductsActionType} from './ActionsTypes'

export interface ProductsLoadingAction {
  type: ProductsActionType.PRODUCTS_LOADING;
}

export interface ProductsFailAction {
  type: ProductsActionType.PRODUCTS_FAIL;
}

export interface ProductsGetAction {
  type: ProductsActionType.PRODUCTS_GET;
  payload: ProductList[];
}

export interface ProductsGetTopAction {
  type: ProductsActionType.PRODUCTS_GET_TOP;
  payload: ProductList[];
}

export type ProductsActions = ProductsLoadingAction | ProductsFailAction | ProductsGetAction | ProductsGetTopAction;