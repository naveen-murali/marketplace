import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { mongoConnection } from "./configs";
import {
    Item,
    User,
    Catalog,
    ItemSchema,
    CatalogSchema,
    userSchemaFactory,
    OrderSchema,
    Order,
} from "./model";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: mongoConnection,
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            { name: Item.name, schema: ItemSchema },
            { name: Catalog.name, schema: CatalogSchema },
            { name: Order.name, schema: OrderSchema },
        ]),
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
