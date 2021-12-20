
import { Recipe, UserData } from '../reducers/types';
import {UserActionType} from './ActionsTypes'

export interface SetCookie {
  type: UserActionType.SET_COOKIE;
  payload: string;
}

export interface GetUserData {
  type: UserActionType.GET_USER_DATA;
  payload: UserData
}

export type UserActions = SetCookie | GetUserData;