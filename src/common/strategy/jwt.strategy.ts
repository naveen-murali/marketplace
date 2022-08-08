import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { StrategyType } from "../../auth/utils";
import { UserType } from "src/mongo/interfaces";
import { User, UserModel } from "src/mongo/model";
import { JwtPayloadType } from "../../auth/interfaces";
import { EnvVariableModel } from "src/common/interface";

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
