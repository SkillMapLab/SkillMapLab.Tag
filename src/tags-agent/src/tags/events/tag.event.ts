import { IsNotEmpty, IsString } from 'class-validator';

export class TagEvent {
  @IsString()
  @IsNotEmpty()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
