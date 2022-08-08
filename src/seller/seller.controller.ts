import { Body, Controller, ParseArrayPipe, Post } from "@nestjs/common";
import { Types } from "mongoose";

import { ItemsDto } from "./dto";
import { UserRole } from "src/mongo/utils";
import { SellerService } from "./seller.service";
import { CatalogType } from "src/mongo/interfaces";
import { Auth, User } from "src/common/decorators";

@Controller("seller")
@Auth(UserRole.SELLER)
export class SellerController {
    constructor(private readonly _sellerService: SellerService) {}

    @Post("create-catalog")
    async createCatalog(
        @Body(new ParseArrayPipe({ items: ItemsDto })) items: ItemsDto[],
        @User("_id") id: Types.ObjectId,
    ): Promise<CatalogType> {
        return await this._sellerService.createCatalog(id, items);
    }
}
