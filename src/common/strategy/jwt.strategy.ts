import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectModel } from "@nestjs/mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";

import { StrategyType } from "../../auth/utils";
import { EnvVariableModel } from "src/common/interface";
import { JwtPayloadType } from "../../auth/interfaces";
import { User, UserModel } from "src/mongo/model";
import { UserType } from "src/mongo/interfaces";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyType.JWT) {
    constructor(
        @InjectModel(User.name) private readonly _user: UserModel,
        configService: ConfigService<EnvVariableModel>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("JWT_SECRET"),
        });
    }

    async validate(payload: JwtPayloadType): Promise<UserType> {
        const user = await this._user.findById(payload._id);

        if (!user) throw new ForbiddenException("Access denied");

        return user;
    }
}
