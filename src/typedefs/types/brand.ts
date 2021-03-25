import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Brand {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;
}