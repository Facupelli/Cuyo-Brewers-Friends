import { UserActionType } from "../actions/ActionsTypes";
import { UserActions } from "../actions/UserActions";
import { UserData } from "./types";

export interface InitialUserState {
  showModal: boolean;
  cookie: string;
  userData: UserData;
}

const initialUserState: InitialUserState = {
  showModal: true,
  cookie: "",
  userData: {
    _id: "",
    username: "",
    ownRecipes: [],
    ownReviews: [],
    ownBlogs: [],
    ownProducts: [],
    seller: false,
    favs: [],
  },
};

export const userReducer = (
  state: InitialUserState = initialUserState,
  action: UserActions
): InitialUserState => {
  switch (action.type) {
    case UserActionType.SET_COOKIE:
      return {
        ...state,
        cookie: action.payload,
      };
    case UserActionType.GET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case UserActionType.SET_SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
