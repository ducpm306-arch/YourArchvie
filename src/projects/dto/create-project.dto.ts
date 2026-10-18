import { IsMongoId, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsMongoId()
  owner: string;
}
