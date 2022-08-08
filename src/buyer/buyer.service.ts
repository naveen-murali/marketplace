import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Types } from "mongoose";

import { UserRole } from "src/mongo/utils";
import { CatalogType, UserType } from "src/mongo/interfaces";
import { Catalog, CatalogModel, User, UserModel } from "src/mongo/model";

@Injectable()
export class BuyerService {
    constructor(
        @InjectModel(User.name) private readonly _user: UserModel,
        @InjectModel(Catalog.name) private readonly _catalog: CatalogModel,
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
}
