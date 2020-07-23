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
