import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { UserRole } from "src/mongo/utils";
import { StrategyType } from "../../auth/utils";
import { AuthService } from "../../auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(
    Strategy,
    StrategyType.LOCAL,
) {
    constructor(private readonly _authService: AuthService) {
        super({ usernameField: "email", passReqToCallback: true });
    }

    async validate(
        req: { body: { role: UserRole } } & Request,
        email: string,
        password: string,
    ) {
        return this._authService.signin(email, password, req.body.role);
    }
}
