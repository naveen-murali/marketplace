import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { mongoConnection } from "./configs";
import { User, userSchemaFactory } from "./model";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: mongoConnection,
            inject: [ConfigService],
        }),
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory: userSchemaFactory,
            },
        ]),
    ],
    exports: [MongooseModule],
})
export class MongoModule {}
