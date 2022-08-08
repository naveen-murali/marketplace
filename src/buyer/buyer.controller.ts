import { Controller, Get } from "@nestjs/common";

import { Auth } from "src/common/decorators";
import { UserRole } from "src/mongo/utils";
import { BuyerService } from "./buyer.service";

@Controller("buyer")
export class BuyerController {
    constructor(private readonly _buyerService: BuyerService) {}

    @Get("list-of-sellers")
    @Auth(UserRole.BUYER)
    async listOfSellers() {
        return await this._buyerService.listOfSellers();
    }
}
