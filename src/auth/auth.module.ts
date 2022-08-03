import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategy";
import { AuthService } from "./auth.service";

@Module({
    controllers: [AuthController],
    providers: [LocalStrategy, AuthService],
})
export class AuthModule {}
