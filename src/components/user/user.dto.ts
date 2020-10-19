import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsMongoId()
  @IsOptional()
  id?: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}