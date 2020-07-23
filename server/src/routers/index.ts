import TestController from "../controllers/test";

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
];
