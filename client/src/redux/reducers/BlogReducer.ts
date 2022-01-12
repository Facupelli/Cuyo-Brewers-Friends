import { BlogActionType } from "../actions/ActionsTypes";
import { BlogActions } from "../actions/BlogActions";
import { BlogData, UserData } from "./types";

export interface InitialBlogState {
    blogs: BlogData[];
}

const initialUserState: InitialBlogState = {
    blogs: [],
}

export const blogReducer = (state: InitialBlogState = initialUserState, action: BlogActions) : InitialBlogState=> {
    switch(action.type) {
        case BlogActionType.GET_BLOGS:
            return {
                ...state,
                blogs: action.payload,
            }
        default:
            return state;
    }
};

export default blogReducer;