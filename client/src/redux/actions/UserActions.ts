
import { Recipe } from '../reducers/types';
import {UserActionType} from './ActionsTypes'

export interface SetCookie {
  type: UserActionType.SET_COOKIE;
  payload: string;
}

export type UserActions = SetCookie;