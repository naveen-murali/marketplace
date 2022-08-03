import {
    Post,
    Body,
    HttpCode,
    UseGuards,
    Controller,
    HttpStatus,
    UseInterceptors,
    ClassSerializerInterceptor,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { SignupDto } from "./dto";
import { StrategyType } from "./utils";
import { AuthService } from "./auth.service";
import { User } from "src/common/decorators";
import { UserType } from "src/mongo/interfaces";
import { UserEntity } from "./entity/user.entity";

@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @Post("/login")
    @UseGuards(AuthGuard(StrategyType.LOCAL))
    @HttpCode(HttpStatus.OK)
    login(@User() user: UserType): UserEntity {
        const token = this._authService.createToken({
            _id: user._id.toString(),
        });
        return new UserEntity(user, token);
    }

    @Post("/signup")
    async signup(@Body() userDetails: SignupDto): Promise<UserEntity> {
        const { newUser, token } = await this._authService.signup(userDetails);

        return new UserEntity(newUser, token);
    }
}
