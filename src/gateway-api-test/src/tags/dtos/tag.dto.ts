import { IsNotEmpty, IsString } from 'class-validator';

export class TagDto {
  @IsString()
  @IsNotEmpty()
  key: string;
  @IsString()
  @IsNotEmpty()
  name: string;
}
