import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'tag' })
export class Tag {
  @Field((type) => ID)
  id: string;

  @Field()
  key: string;

  @Directive('@upper')
  @Field()
  name: string;

  @Field()
  status: number;
}
