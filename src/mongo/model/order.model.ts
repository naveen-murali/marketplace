import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { Item } from "./item.model";
import { User } from "./user.model";
import { Catalog } from "./catalog.model";
import { ItemType } from "../interfaces";

@Schema({ timestamps: true })
export class Order {
    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: User.name,
    })
    buyer: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: User.name,
    })
    seller: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: Catalog.name,
    })
    catalog: Types.ObjectId;

    @Prop({
        type: [
            {
                item: {
                    type: Types.ObjectId,
                    ref: Item.name,
                },
                price: Number,
            },
        ],
        required: true,
        _id: false
    })
    items: {
        item: Types.ObjectId | ItemType;
        price: number;
    };

    @Prop({
        type: Number,
        required: true,
    })
    price: number;
}

export type OrderModel = Model<Order & Document>;

export const OrderSchema = SchemaFactory.createForClass(Order);
