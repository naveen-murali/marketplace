import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { Item } from "./item.model";
import { User } from "./user.model";
import { ItemType } from "../interfaces";

@Schema({ timestamps: true })
export class Catalog {
    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: User.name,
    })
    seller: Types.ObjectId;

    @Prop({
        type: [
            {
                type: Types.ObjectId,
                ref: Item.name,
            },
        ],
    })
    items: Types.ObjectId[] | ItemType[];
}

export type CatalogModel = Model<Catalog & Document>;

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
