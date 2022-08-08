import { Controller, Get, Param } from "@nestjs/common";

import { UserRole } from "src/mongo/utils";
import { Auth } from "src/common/decorators";
import { BuyerService } from "./buyer.service";
import { CatalogType, UserType } from "src/mongo/interfaces";

@Controller("buyer")
@Auth(UserRole.BUYER)
export class BuyerController {
    constructor(private readonly _buyerService: BuyerService) {}

    @Get("list-of-sellers")
    async listOfSellers(): Promise<UserType[]> {
        return await this._buyerService.listOfSellers();
    }

    @Get("seller-catalog/:seller_id")
    async sellerCatalog(
        @Param("seller_id") sellerId: string,
    ): Promise<CatalogType> {
        return await this._buyerService.sellerCatalog(sellerId);
    }
}
