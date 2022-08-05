import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { RoleGuard } from "../guards";
import { Role } from "./roles.decorator";
import { UserRole } from "src/mongo/utils";
import { StrategyType } from "src/auth/utils";

/**
 * Function that authorize user based on the provided `role`.
 * Usefull to authorize user based on the `role`
 *
 * @param role of the user
 *
 * @returns `applyDecorators(Role(...role), UseGuards(AuthGuard(StrategyType.JWT), RoleGuard));`
 */
export const Auth = (...role: UserRole[]) =>
    applyDecorators(
        Role(...role),
        UseGuards(AuthGuard(StrategyType.JWT), RoleGuard),
    );
