import { Type } from "class-transformer";
import {
    ArrayMinSize,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from "class-validator";

export class ItemsDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}

export class CatalogItemsDto {
    @Type(() => ItemsDto)
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    items: ItemsDto[];
}
