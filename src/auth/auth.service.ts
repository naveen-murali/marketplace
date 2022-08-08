import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";

import { SignupDto } from "./dto";
import { JwtPayloadType } from "./interfaces";
import { UserRole } from "src/mongo/utils";
import { UserType } from "src/mongo/interfaces";
import { User, UserModel } from "src/mongo/model";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private _user: UserModel,
        private readonly _jwtService: JwtService,
    ) {}

    async signin(email: string, password: string, role: UserRole) {
        if (!role) throw new BadRequestException("role field is missing");

        const user = await this._user.findOne({
            email,
            role: { $in: [role] },
        });

        /* check if user exists or if exists check if the password matches or not */
        if (!user || !(await user.matchPassword(password)))
            throw new UnauthorizedException("Invalid credential");

        return user;
    }

    async signup(userDetails: SignupDto): Promise<{
        newUser: UserType;
        token: string;
    }> {
        /* Checking is user exist */
        const isUserExist = await this._user.exists({
            email: userDetails.email,
        });

        if (isUserExist)
            throw new BadRequestException(
                `${userDetails.email} already exists.`,
            );

        /* creating new user */
        let newUser = new this._user(userDetails);
        newUser = await newUser.save();

        /* creating token with the payload as user's id */
        const token = this.createToken({ _id: newUser._id.toString() });
        return { newUser, token };
    }

    createToken(payload: JwtPayloadType): string {
        return this._jwtService.sign(payload);
    }
}
