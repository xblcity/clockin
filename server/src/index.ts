import Koa from "koa";
import Router from "koa-router";
import cors from "koa2-cors";
import bodyParser from "koa-bodyparser";

import { AppRoutes } from "./routers";

const app = new Koa();

const router = new Router();

// ep. router.get('/test', action) action回调可接收ctx参数
AppRoutes.forEach((route) => router[route.method](route.path, route.action));

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);
