import { Body, Controller, ParseArrayPipe, Post } from "@nestjs/common";

import { UserRole } from "src/mongo/utils";
import { Auth, User } from "src/common/decorators";
import { SellerService } from "./seller.service";
import { Types } from "mongoose";
import { CatalogType } from "src/mongo/interfaces";
import { CatalogItemsDto, ItemsDto } from "./dto";

@Controller("seller")
export class SellerController {
    constructor(private readonly _sellerService: SellerService) {}

    @Post("create-catalog")
    @Auth(UserRole.SELLER)
    async createCatalog(
        @Body(new ParseArrayPipe({ items: ItemsDto })) items: ItemsDto[],
        @User("_id") id: Types.ObjectId,
    ): Promise<CatalogType> {
        return await this._sellerService.createCatalog(id, items);
    }
}
