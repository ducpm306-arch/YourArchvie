import { IsArray, IsBoolean, IsMongoId, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @IsMongoId({ each: true })
  permissions: string[];
}
