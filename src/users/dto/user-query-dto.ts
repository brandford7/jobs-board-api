/* eslint-disable prettier/prettier */
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UserQueryDTO {
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsInt()
  @IsOptional()
  limit?: number;

  @IsInt()
  @IsOptional()
  offset?: number;
}
