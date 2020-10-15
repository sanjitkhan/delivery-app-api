import { IsArray, IsCurrency, IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';

export enum Brand {
  GODREJ = 'Godrej'
}

export enum Category {
  ICE_CREAM = 'Ice Cream',
  FROZEN_FOOD = 'Frozen Food'
}

export class ProductDto {
  @IsString()
  name: string;

  @IsEnum(Brand)
  brand: Brand;

  @IsArray()
  @IsEnum(Category, { each: true })
  categories?: Category[];

  @IsNumber()
  stock?: number = 0;

  @IsCurrency()
  price: number;
}

export class ParamDto {
  @IsMongoId()
  id: string;
}