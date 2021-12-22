import { UserActionType } from "../actions/ActionsTypes";
import { UserActions } from "../actions/UserActions";
import { UserData } from "./types";

export interface InitialUserState {
    cookie: string;
    userData: UserData;

  }

const initialUserState: InitialUserState = {
    cookie: '',
    userData: {_id: '', username: '', ownRecipes: [], ownReviews: [] }
}

export const userReducer = (state: InitialUserState = initialUserState, action: UserActions) : InitialUserState=> {
    switch(action.type) {
        case UserActionType.SET_COOKIE:
            return {
                ...state,
                cookie: action.payload,
            }
        case UserActionType.GET_USER_DATA:
            return{
                ...state,
                userData: action.payload
            }
        default:
            return state;
    }
};

export default userReducer;