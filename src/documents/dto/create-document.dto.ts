import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  title: string;

  @IsString()
  url: string;

  @IsString()
  description: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  tag: string;

  @IsString()
  thumbail: string;

  @IsArray()
  @IsMongoId({ each: true })
  project: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  folder: string;
}
