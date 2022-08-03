import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { UserRole } from "../utils";

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, unique: true, required: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({
        type: [
            {
                type: String,
                required: true,
                default: UserRole.BUYER,
                enum: UserRole,
            },
        ],
    })
    role: UserRole[];
}

export type UserModel = Model<User & Document>;

export const UserSchema = SchemaFactory.createForClass(User);
