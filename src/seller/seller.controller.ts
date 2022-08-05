import { Body, Controller, Post } from "@nestjs/common";

import { UserRole } from "src/mongo/utils";
import { Auth } from "src/common/decorators";
import { SellerService } from "./seller.service";

@Controller("seller")
export class SellerController {
    constructor(private readonly _sellerService: SellerService) {}

    @Post("create-catalog")
    @Auth(UserRole.SELLER)
    async createCatalog(@Body() catalog) {
        return catalog;
    }
}
