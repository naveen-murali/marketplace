import { ArrayMinSize, IsArray, IsString, Length } from "class-validator";
import { Types } from "mongoose";

export class CreateOrderDto {
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    @Length(24, 24, { each: true })
    items: string[];

    get itemsAsObjectId(): Types.ObjectId[] {
        return this.items.map((item: string) => new Types.ObjectId(item));
    }
}
