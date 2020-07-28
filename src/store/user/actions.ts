import { UserConstants } from "./constants";
import { UserInfo } from "./reducer";

export const addUserInfo = (info: UserInfo) => {
  return {
    type: UserConstants.ADDUSERINFO,
    payload: {
      info,
    },
  };
};

export interface AddUserInfoAction {
  type: UserConstants.ADDUSERINFO;
  payload: UserInfo;
}
export type Action = AddUserInfoAction;

// 异步的 action
// export function asyncAdd() {
//   return (dispatch) => {
//     setTimeout(() => {
//       dispatch(add(3));
//     }, 2000);
//   };
// }
