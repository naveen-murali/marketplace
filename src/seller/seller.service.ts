import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Types } from "mongoose";

import { ItemsDto } from "./dto";
import { CatalogType, OrderType } from "src/mongo/interfaces";
import {
    Catalog,
    CatalogModel,
    Item,
    ItemModel,
    Order,
    OrderModel,
} from "src/mongo/model";

@Injectable()
export class SellerService {
    constructor(
        @InjectModel(Item.name) private readonly _item: ItemModel,
        @InjectModel(Catalog.name) private readonly _catalog: CatalogModel,
        @InjectModel(Order.name) private readonly _order: OrderModel,
    ) {}

    async createCatalog(
        id: Types.ObjectId,
        items: ItemsDto[],
    ): Promise<CatalogType> {
        const insertedItems = await this._item.insertMany<ItemsDto[]>(items);

        const newCatalog = await this._catalog
            .findOneAndUpdate(
                {
                    seller: id,
                },
                {
                    $push: {
                        items: {
                            $each: insertedItems.map((item) => item._id),
                        },
                    },
                },
                {
                    upsert: true,
                    new: true,
                },
            )
            .populate("items");

        return newCatalog;
    }

    async orders(sellerId: Types.ObjectId): Promise<OrderType[]> {
        return await this._order
            .find({ seller: sellerId }, { __v: 0 })
            .populate([
                { path: "items.item", select: "name price" },
                { path: "buyer", select: "name email" },
            ]);
    }
}
