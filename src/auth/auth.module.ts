import { Module } from "@nestjs/common";

import { LocalStrategy } from "./strategy";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
