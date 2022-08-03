import { Exclude, Transform } from "class-transformer";
import { Document } from "mongoose";
import { UserType } from "src/mongo/interfaces";
import { UserRole } from "src/mongo/utils";

export class UserEntity {
    @Transform((id) => id.value.toString())
    _id: string;
    name: string;
    email: string;
    role: UserRole[];
    token: string;

    @Exclude()
    password: string;

    constructor(user: UserType, token: string) {
        if (user instanceof Document)
            Object.assign(this, {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            });
        else Object.assign(this, { ...user, token });
    }
}
