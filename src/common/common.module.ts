import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Global()
@Module({
    imports: [
        JwtModule.register({
            secret: "some secrete",
        }),
    ],
    exports: [JwtModule],
})
export class CommonModule {}
