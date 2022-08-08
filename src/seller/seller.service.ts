import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Types } from "mongoose";

import { ItemsDto } from "./dto";
import { CatalogType } from "src/mongo/interfaces";
import { Catalog, CatalogModel, Item, ItemModel } from "src/mongo/model";

@Injectable()
export class SellerService {
    constructor(
        @InjectModel(Item.name) private readonly _item: ItemModel,
        @InjectModel(Catalog.name) private readonly _catalog: CatalogModel,
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
}
