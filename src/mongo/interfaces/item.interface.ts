import { Types } from "mongoose";

import { Item } from "src/mongo/model";

export interface ItemType extends Item {
    _id: Types.ObjectId;
}
