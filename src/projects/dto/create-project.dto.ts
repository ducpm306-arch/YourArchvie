import { IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsMongoId({ each: true })
  owner: string;
}
