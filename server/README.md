# Server

## 初始化

```bash
npm init -y
yarn add typescript ts-node -D
yarn add koa -S
yarn add @types/koa
```

创建入口文件

```bash
mkdir src
cd src
touch index.ts
```

文件内容

```ts
import Koa from "koa";

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = "hi, i am xbl";
});

app.listen(3001);
```

全局安装`nodemon`，并在`package.json`命令中添加`dev`

```js
"dev": "nodemon src/index.ts"
```

## 配置 controller & router

```bash
yarn add koa-router -S
yarn add @types/koa-router -D
yarn add koa2-cors -S // 跨域处理
yarn add @types/koa2-cors -D
yarn add koa-bodyparser -S // 请求体参数处理
yarn add @types/koa-bodyparser -D
```

### 创建 controller

```bash
mkdir controller
cd controller
touch test.ts
```

```ts
import { Context } from "koa";
class TestController {
  public async testGet(ctx: Context) {
    console.log(ctx.query);
    ctx.body = { data: "你好" };
  }

  public async testPost(ctx: Context) {
    console.log(ctx.query);
    console.log(ctx.request.body);
    ctx.body = { data: "你好" };
  }
}

export default new TestController();
```

### 创建 router

```bash
mkdir routers
cd routers
touch index.ts
```

```ts
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
```

### 入口文件修改

```ts
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
```

`postman` 进行测试，`POST` 选择 `raw/json`
