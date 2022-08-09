import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";

export class ParseObjectIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        return this._parseToObjectId(value);
    }

    private _parseToObjectId(value: string | string[]) {
        if (Array.isArray(value))
            return value.map((v) => new Types.ObjectId(v));

        return new Types.ObjectId(value);
    }
}
