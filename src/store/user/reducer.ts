import { Action } from "./actions";
import { UserConstants } from "./constants";

export interface UserInfo {
  nickname: string;
}
interface State {
  userInfo: UserInfo | null;
}

const initialState: State = {
  userInfo: null,
};

export default function counter(state: State = initialState, action: Action) {
  switch (action.type) {
    case UserConstants.ADDUSERINFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
}
