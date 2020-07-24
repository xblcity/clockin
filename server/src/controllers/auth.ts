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
