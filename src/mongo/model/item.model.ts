import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { User } from "./user.model";

@Schema({ timestamps: true })
export class Item {
    @Prop({
        type: Types.ObjectId,
        ref: User.name,
    })
    seller: Types.ObjectId;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: Number, required: true })
    price: number;
}

export type ItemModel = Model<Item & Document>;

export const ItemSchema = SchemaFactory.createForClass(Item);
