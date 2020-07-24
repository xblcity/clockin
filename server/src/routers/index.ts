import TestController from "../controllers/test";
import UserController from "../controllers/user";
import AuthController from "../controllers/auth";

export interface RouteItem {
  path: string;
  method: "get" | "post" | "put" | "delete";
  action: any;
}

export const AppRoutes: RouteItem[] = [
  {
    path: "/api/test",
    method: "get",
    action: TestController.testGet,
  },
  {
    path: "/api/test",
    method: "post",
    action: TestController.testPost,
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
  {
    path: "/api/register",
    method: "post",
    action: AuthController.register,
  },
];
