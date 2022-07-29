import { ConfigService } from "@nestjs/config";
import { Connection } from "mongoose";

import { EnvVariableModel } from "src/common/interface";

export const mongoConnection = (
    configService: ConfigService<EnvVariableModel>,
) => ({
    uri: configService.get("MONGO_URI"),
    connectionFactory: (connection: Connection) => {
        console.log("\x1b[33m[MongoDB]: \x1b[32m Connected \x1b[0m");

        connection
            .on("reconnected", () => {
                console.log("\x1b[33m[MongoDB]: \x1b[32m Reconnected \x1b[0m");
            })
            .on("disconnected", () => {
                console.log("\x1b[33m[MongoDB]: \x1b[31m Disconnected \x1b[0m");
            })
            .on("error", (error) => {
                console.log("\x1b[33m[MongoDB]: \x1b[31m ERROR \x1b[0m");
                console.error(error);
            });
    },
});
