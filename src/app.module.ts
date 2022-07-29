import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";

/* app controller and service */
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { LoggingInterceptor } from "./common/logging.interceptor";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
