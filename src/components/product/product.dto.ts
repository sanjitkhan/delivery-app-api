import { IsArray, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductDto {
  @IsMongoId()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsMongoId()
  brand: string;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  categories?: string[];

  @IsNumber()
  stock?: number = 0;

  @IsNumber()
  price: number;
}