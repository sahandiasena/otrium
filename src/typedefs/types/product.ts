import { Field, ObjectType, InputType, ID } from 'type-graphql'
import { Brand } from './brand';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  sku: string;

  @Field(() => Brand)
  brand: Brand;
}

@InputType()
export class ProductInput {
  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  sku: string;

  @Field()
  brandId: number;
}