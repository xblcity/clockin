import { TestGet, TestPost } from "../controller/test";

export interface RouteItem {
  path: string;
  method: "get" | "post" | "put" | "delete";
  action: any;
}

export const AppRoutes: RouteItem[] = [
  {
    path: "/api/test",
    method: "get",
    action: TestGet.test,
  },
  {
    path: "/api/test",
    method: "post",
    action: TestPost.test,
  },
];
