import { Context } from "koa";
class TestController {
  public static async testGet(ctx: Context) {
    console.log(ctx.query);
    ctx.body = { data: "你好" };
  }

  public static async testPost(ctx: Context) {
    console.log(ctx.query);
    console.log(ctx.request.body);
    ctx.body = { data: "你好" };
  }
}

export default TestController;
