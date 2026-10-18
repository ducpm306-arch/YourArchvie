import { IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsMongoId({ each: true })
  project: string;

  @IsArray()
  @IsMongoId({ each: true })
  parent: string;
}
