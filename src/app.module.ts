import { Module } from "@nestjs/common";

/* app controller and service */
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
