# Server

## 1.初始化

```bash
npm init -y
yarn add typescript ts-node@6.2.0 -D #ts-node安装@7版本以上不出现命名空间不识别的情况
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

## 2.配置 controller & router

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

## 3.连接数据库

- 安装 typeorm，配置 entity 以及 ormconfig，入口配置连接
- 编写对应 controller 以及 router

### 数据库准备

- 安装 mysql 数据库，安装 mysql workbench
- 创建数据库 koa-test

### typeorm 配置

```bash
yarn add mysql typeorm reflect-metadata -S
yarn add argon2 -S # 用于密码加密
```

```bash
touch ormconfig.js
```

```js
module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "koa-test",
  synchronize: true,
  entities: ["src/entity/*.ts"],
};
```

### tsconfig.json

```json
// 注释
"strict": true,
// 解除注释
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

### types 定义

```bash
mkdir types
cd types
touch user.d.ts
```

```ts
export as namespace IUser;

export interface Item {
  id: number;
  username: string;
  password: string;
}
```

### entity 定义

```bash
mkdir entity
cd entity
touch user.ts
touch auth.ts # 注册
```

```ts
// user.ts

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User implements IUser.Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;
}

export default User;
```

### controller 定义

```bash
cd controllers
touch user.ts
```

```ts
// user.ts

import { Context } from "koa";
import { getManager } from "typeorm";

import { User } from "../entity/user";

class UserController {
  public static async listUser(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();

    ctx.status = 200;
    ctx.body = users;
  }

  public static async showUserDetail(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(ctx.query.id);

    if (user) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      ctx.status = 404;
    }
  }

  public static async updateUser(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    await userRepository.update(ctx.query.id, ctx.request.body);
    const updateUser = await userRepository.findOne(ctx.query.id);

    if (updateUser) {
      ctx.status = 200;
      ctx.body = updateUser;
    } else {
      ctx.status = 404;
    }
  }

  public static async deleteUser(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    await userRepository.delete(ctx.query.id);

    ctx.status = 204;
  }
}

export default UserController;
```

```ts
// auth.ts

import { Context } from "koa";
import * as argons2 from "argon2";
import { getManager } from "typeorm";
import { User } from "../entity/user";

export default class AuthController {
  public static async register(ctx: Context) {
    const userRepository = getManager().getRepository(User);

    const newUser = new User();
    newUser.name = ctx.request.body.name;
    newUser.password = await argons2.hash(ctx.request.body.password);

    const user = await userRepository.save(newUser);

    ctx.status = 201;
    ctx.body = user;
  }
}
```

### 入口配置

```ts
import Koa from "koa";
import Router from "koa-router";
import cors from "koa2-cors";
import bodyParser from "koa-bodyparser";
import { createConnection } from "typeorm";
import "reflect-metadata";

import { AppRoutes } from "./routers";

createConnection()
  .then(() => {
    const app = new Koa();

    const router = new Router();

    // ep. router.get('/test', action) action回调可接收ctx参数
    AppRoutes.forEach((route) =>
      router[route.method](route.path, route.action)
    );

    app
      .use(cors())
      .use(bodyParser())
      .use(router.routes())
      .use(router.allowedMethods());

    app.listen(3001);
  })
  .catch((err: string) => console.log("TypeORM connection error", err));
```
