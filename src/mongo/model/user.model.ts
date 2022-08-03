import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CallbackWithoutResultAndOptionalError, Model } from "mongoose";
import * as bcrypt from "bcrypt";

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

export type UserModel = Model<
    User & Document & { matchPassword: (password: string) => Promise<boolean> }
>;

export const UserSchema = SchemaFactory.createForClass(User);

export const userSchemaFactory = () => {
    UserSchema.methods.matchPassword = async function matchPassword(
        enteredPassword: string,
    ) {
        return await bcrypt.compare(enteredPassword, this.password);
    };

    UserSchema.pre(
        "save",
        async function (next: CallbackWithoutResultAndOptionalError) {
            if (!this.isModified("password")) next();

            let salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        },
    );

    return UserSchema;
};
