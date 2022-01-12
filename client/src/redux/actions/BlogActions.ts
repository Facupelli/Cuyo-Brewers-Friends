import { Blog } from '../reducers/types';
import {BlogActionType} from './ActionsTypes'


export interface GetBlogs {
  type: BlogActionType.GET_BLOGS;
  payload: Blog[]
}

export type BlogActions = GetBlogs;