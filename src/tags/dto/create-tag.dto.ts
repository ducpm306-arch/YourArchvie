import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTagDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
