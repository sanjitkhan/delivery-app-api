import { IsArray, IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export enum Brand {
  GODREJ = 'Godrej'
}

export enum Category {
  ICE_CREAM = 'Ice Cream',
  FROZEN_FOOD = 'Frozen Food'
}

export class ProductDto {
  @IsMongoId()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsEnum(Brand)
  brand: Brand;

  @IsArray()
  @IsOptional()
  @IsEnum(Category, { each: true })
  categories?: Category[];

  @IsNumber()
  stock?: number = 0;

  @IsNumber()
  price: number;
}