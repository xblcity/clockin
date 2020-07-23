import { Context } from "koa";
import { getManager } from "typeorm";

import { User } from "../entity/user";

export default class UserController {
  public async listUser(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();

    ctx.status = 200;
    ctx.body = users;
  }

  public async showUserDetail(ctx: Context) {
    const userRepository = getManager().getRepository(User)
    // const user = await userRepository.findOne(ctx.query.id)
  }
}
