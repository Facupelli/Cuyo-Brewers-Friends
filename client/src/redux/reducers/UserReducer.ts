import { UserActionType } from "../actions/ActionsTypes";
import { UserActions } from "../actions/UserActions";

export interface InitialUserState {
    cookie: string;

  }

const initialUserState: InitialUserState = {
    cookie: ''
}

export const userReducer = (state: InitialUserState = initialUserState, action: UserActions) : InitialUserState=> {
    switch(action.type) {
        case UserActionType.SET_COOKIE:
            return {
                ...state,
                cookie: action.payload,
            }
        default:
            return state;
    }
};

export default userReducer;