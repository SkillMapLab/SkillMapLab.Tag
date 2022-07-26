import { Field, InputType } from '@nestjs/graphql';
import { Length, MaxLength } from 'class-validator';

@InputType()
export class TagInput {
  @Field()
  @MaxLength(10)
  key: string;

  @Field()
  @Length(30, 255)
  name: string;

  @Field({ defaultValue: 1 })
  status: number;
}
