import {
  IsEmail,
  IsString,
  IsMongoId,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsArray()
  @IsMongoId({ each: true })
  role: string;
}
