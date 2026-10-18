import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  name: string;

  @IsString()
  path: string;

  @IsString()
  method: string;

  @IsString()
  module: string;

  @IsString()
  description: string;
}
