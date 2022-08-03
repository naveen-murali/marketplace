import { IsEmail, IsString, IsEnum } from "class-validator";

import { UserRole } from "src/mongo/utils";

export class SignupDto {
    @IsString()
    name: string

    @IsEmail()
    email: string;

    @IsString()
    password: string

    @IsEnum(UserRole, {each: true, message: "role must be BUYER or SELLER"})
    role:string
}
