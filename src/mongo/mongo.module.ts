import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { mongoConnection } from "./utils";

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: mongoConnection,
            inject: [ConfigService],
        }),
    ],
})
export class MongoModule {}
