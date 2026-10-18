import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsMongoId()
  project: string;

  @IsOptional()
  @IsMongoId()
  parent?: string;
}
