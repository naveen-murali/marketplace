import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { ROLE_META } from "../decorators";
import { UserRole } from "src/mongo/utils";
import { UserType } from "src/mongo/interfaces";


@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requireRoles = this._reflector.getAllAndOverride<UserRole[]>(
            ROLE_META,
            [context.getHandler(), context.getClass()],
        );

        const { user } = context
            .switchToHttp()
            .getRequest<Request & { user: UserType }>();

        if (
            !requireRoles?.length ||
            !requireRoles.some((role) => user.role.includes(role))
        )
            throw new ForbiddenException("Access denied");

        return true;
    }
}
