import { BlogData } from '../reducers/types';
import {BlogActionType} from './ActionsTypes'


export interface GetBlogs {
  type: BlogActionType.GET_BLOGS;
  payload: BlogData[]
}

export type BlogActions = GetBlogs;