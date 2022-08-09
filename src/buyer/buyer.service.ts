import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Types } from "mongoose";

import { UserRole } from "src/mongo/utils";
import { CatalogType, ItemType, UserType } from "src/mongo/interfaces";
import {
    Catalog,
    CatalogModel,
    Order,
    OrderModel,
    User,
    UserModel,
} from "src/mongo/model";

@Injectable()
export class BuyerService {
    constructor(
        @InjectModel(User.name) private readonly _user: UserModel,
        @InjectModel(Catalog.name) private readonly _catalog: CatalogModel,
        @InjectModel(Order.name) private readonly _order: OrderModel,
    ) {}

    async listOfSellers(): Promise<UserType[]> {
        return await this._user.find(
            { role: { $in: [UserRole.SELLER] } },
            {
                role: 0,
                password: 0,
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
            },
        );
    }

    async sellerCatalog(id: string): Promise<CatalogType> {
        return await this._catalog
            .findOne({ seller: new Types.ObjectId(id) })
            .populate("items");
    }

    async createOrder(
        buyer: Types.ObjectId,
        seller: Types.ObjectId,
        items: Types.ObjectId[],
    ) {
        /* finding the catalog of the user and same time checking the given products are in the items array */
        const catalog = await this._catalog
            .findOne({
                seller,
                items: { $all: items },
            })
            .populate("items", "_id price");

        /* confirming for catalog exists or not */
        if (!catalog)
            throw new BadRequestException("seller catalog is not found");

        /* making holder for the final order items and the total price */
        let orderItems = [] as { price: number; item: Types.ObjectId }[];
        let totalPrice = 0;

        /* making the items array to object for optimization */
        const itemObj = items.reduce<{ [key: string]: boolean }>(
            (acc, item) => {
                acc[item._id.toString()] = true;
                return acc;
            },
            {},
        );

        /* getting all the items details form the catalog and calculating the total price */
        (catalog.items as ItemType[]).forEach((item: ItemType) => {
            if (itemObj[item._id.toString()]) {
                orderItems.push({ item: item._id, price: item.price });
                totalPrice += item.price;
            }
        });

        let newOrder = new this._order({
            buyer,
            seller,
            catalog: catalog._id,
            items: orderItems,
            price: totalPrice,
        });

        return await newOrder.save();
    }
}
