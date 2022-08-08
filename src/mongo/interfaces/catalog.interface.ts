import { Types } from "mongoose";
import { Catalog } from "../model";


export interface CatalogType extends Catalog {
    _id: Types.ObjectId;
}
