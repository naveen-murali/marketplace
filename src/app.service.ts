import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { EnvVariableModel } from "./common/interface";

@Injectable()
export class AppService {
    constructor(
        private readonly _configService: ConfigService<EnvVariableModel>,
    ) {}

    getHello(): string {
        return "Hello World!";
    }
}
