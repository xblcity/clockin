import { Context } from "koa";

class TestGetController {
  async test(ctx: Context) {
    console.log(ctx.query);
    ctx.body = { data: "你好" };
  }
}

class TestPostController {
  async test(ctx: Context) {
    console.log(ctx.query);
    console.log(ctx.request.body);
    ctx.body = { data: "你好" };
  }
}

export const TestGet = new TestGetController();
export const TestPost = new TestPostController();
