import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { UserRole } from "src/mongo/utils";
import { Auth, User } from "src/common/decorators";
import { BuyerService } from "./buyer.service";
import { CatalogType, UserType } from "src/mongo/interfaces";
import { CreateOrderDto } from "./dto";
import { ParseObjectIdPipe } from "src/common/pipes";
import { Types } from "mongoose";

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

    @Post("create-order/:seller_id")
    async createOrder(
        @User("_id") buyerId: Types.ObjectId,
        @Param("seller_id", new ParseObjectIdPipe()) sellerId: Types.ObjectId,
        @Body() body: CreateOrderDto,
    ) {
        return await this._buyerService.createOrder(
            buyerId,
            sellerId,
            body.itemsAsObjectId,
        );
    }
}
