import { IsMongoId, IsOptional, IsString } from 'class-validator';

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
  @IsMongoId()
  tag?: string;

  @IsString()
  thumbail: string;

  @IsMongoId()
  project: string;

  @IsOptional()
  @IsMongoId()
  folder?: string;
}
