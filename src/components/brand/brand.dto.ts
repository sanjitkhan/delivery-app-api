import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class BrandDto {
  @IsMongoId()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;
}