import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsMongoId()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;
}