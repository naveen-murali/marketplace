import { Types } from "mongoose";
import { Order } from "../model";

export interface OrderType extends Order {
    _id: Types.ObjectId;
}
