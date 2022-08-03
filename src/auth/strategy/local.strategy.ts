import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { StrategyType } from "../utils";
import { User, UserModel } from "../../mongo/model";

@Injectable()
export class LocalStrategy extends PassportStrategy(
    Strategy,
    StrategyType.LOCAL,
) {
    constructor(@InjectModel(User.name) private readonly User: UserModel) {
        super({ usernameField: "email", passReqToCallback: true });
    }

    async validate(
        req: { body: { role: string } } & Request,
        email: string,
        password: string,
    ) {
        const { role } = req.body;
        const user = await this.User.findOne({
            email,
            password,
            role: { $in: [role] },
        });

        if (!user) throw new BadRequestException("Invalid credential");

        return user;
    }
}
