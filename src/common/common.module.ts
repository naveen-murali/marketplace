import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { RoleGuard } from "./guards";
import { JwtStrategy } from "./strategy";
import { EnvVariableModel } from "./interface";
import { MongoModule } from "src/mongo/mongo.module";

@Global()
@Module({
    imports: [
        MongoModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService<EnvVariableModel>) => ({
                secret: configService.get("JWT_SECRET"),
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [RoleGuard, JwtStrategy],
    exports: [MongoModule, JwtModule],
})
export class CommonModule {}
