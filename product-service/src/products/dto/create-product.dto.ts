import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(200)
  description: string;

  @IsNumber()
  year: number;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  model: string;
}
