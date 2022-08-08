import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { User, UserModel } from "src/mongo/model";
import { UserRole } from "src/mongo/utils";

@Injectable()
export class BuyerService {
    constructor(@InjectModel(User.name) private readonly _user: UserModel) {}

    async listOfSellers() {
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
}
