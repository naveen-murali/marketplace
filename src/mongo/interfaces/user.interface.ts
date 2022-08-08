import { Types } from "mongoose";

import { User } from "src/mongo/model";

export interface UserType extends User {
    _id: Types.ObjectId;
}
