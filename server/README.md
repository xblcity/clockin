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

全局安装`nodemon`，并在命令中添加`dev`

```js
"dev": "nodemon src/index.ts"
```
