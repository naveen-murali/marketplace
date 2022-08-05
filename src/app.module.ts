import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

/* app controller and service */
import { AppService } from "./app.service";
import { AppController } from "./app.controller";

/* external modules */
import { MongoModule } from "./mongo/mongo.module";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { CommonModule } from "./common/common.module";
import { SellerModule } from './seller/seller.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CommonModule,
        MongoModule,
        AuthModule,
        SellerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
