import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";

import { SignupDto } from "./dto";
import { PayloadType } from "./interfaces";
import { UserRole } from "src/mongo/utils";
import { UserType } from "src/mongo/interfaces";
import { User, UserModel } from "src/mongo/model";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private user: UserModel,
        private readonly _jwtService: JwtService,
    ) {}

    async signin(email: string, password: string, role: UserRole) {
        const user = await this.user.findOne({
            email,
            password,
            role: { $in: [role] },
        });

        if (!user) throw new BadRequestException("Invalid credential");

        return user;
    }

    async signup(
        userDetails: SignupDto,
    ): Promise<{ newUser: UserType; token: string }> {
        /* Checking is user exist */
        const isUserExist = await this.user.exists({
            email: userDetails.email,
        });

        if (isUserExist)
            throw new BadRequestException(
                `${userDetails.email} already exists.`,
            );

        /* creating new user */
        let newUser = new this.user(userDetails);
        newUser = await newUser.save();

        /* creating token with the payload as user's id */
        const token = this.createToken({ _id: newUser._id.toString() });
        return { newUser, token };
    }

    createToken(payload: PayloadType): string {
        return this._jwtService.sign(payload);
    }
}
