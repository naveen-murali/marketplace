import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { EnvVariableModel } from "./interface";

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService<EnvVariableModel>) => ({
                secret: configService.get("JWT_SECRET"),
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [JwtModule],
})
export class CommonModule {}
