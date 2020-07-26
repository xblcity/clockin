import UserController from "../controllers/user";

export interface RouteItem {
  path: string;
  method: "get" | "post" | "put" | "delete";
  action: any;
}

export const AppRoutes: RouteItem[] = [
  {
    path: "/api/wxLogin",
    method: "post",
    action: UserController.wxLogin,
  },
  {
    path: "/api/listUser",
    method: "get",
    action: UserController.listUser,
  },
  {
    path: "/api/showUserDetail",
    method: "get",
    action: UserController.showUserDetail,
  },
  {
    path: "/api/updateUser",
    method: "post",
    action: UserController.updateUser,
  },
  {
    path: "/api/deleteUser",
    method: "post",
    action: UserController.deleteUser,
  },
];
