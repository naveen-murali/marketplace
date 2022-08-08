import { SetMetadata } from "@nestjs/common";

import { UserRole } from "src/mongo/utils";

export const ROLE_META = "role";

export const Role = (...role: UserRole[]) => SetMetadata(ROLE_META, role);
