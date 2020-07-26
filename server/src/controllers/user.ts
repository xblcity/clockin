import { Context } from "koa";
import { getManager } from "typeorm";
import request from "request";
import { wxConfig } from "../config";

import { User } from "../entity/user";

class UserController {
  public static async wxLogin(ctx: Context) {
    const { code } = ctx.request.body;
    if (!code) {
      ctx.status = 400;
      ctx.body = "参数不正确";
      return;
    }
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${wxConfig.appid}&secret=${wxConfig.secret}&js_code=${code}&grant_type=authorization_code`;
    await request(url, (err, response) => {
      console.log(err, response.body);
      if (err) {
        ctx.status = 401;
        ctx.body = "请求微信服务器失败";
      }
      ctx.status = 200;
      ctx.body = {
        openid: 9,
      };
      const { errcode, errmsg, openid } = JSON.parse(response.body);
      if (errcode || errmsg) {
        ctx.status = 401;
        ctx.body = {
          errcode,
          errmsg,
        };
        return;
      }
      ctx.status = 200;
      ctx.body = {
        openid,
      };
    });
  }

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
