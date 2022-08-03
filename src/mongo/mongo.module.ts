import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { mongoConnection } from "./utils";
import { User, UserSchema } from "./model";

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: mongoConnection,
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    exports: [MongooseModule],
})
export class MongoModule {}
