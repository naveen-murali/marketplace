import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/* Get User data form the request. */
export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        return data ? req.user[data] : req.user;
    },
);
