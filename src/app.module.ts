import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

/* app controller and service */
import { AppService } from "./app.service";
import { AppController } from "./app.controller";

/* external modules */
import { AuthModule } from "./auth/auth.module";
import { BuyerModule } from "./buyer/buyer.module";
import { MongoModule } from "./mongo/mongo.module";
import { CommonModule } from "./common/common.module";
import { SellerModule } from "./seller/seller.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CommonModule,
        MongoModule,
        AuthModule,
        SellerModule,
        BuyerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
