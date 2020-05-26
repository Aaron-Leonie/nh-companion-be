import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TextBody {
    @Field()
    body: string;
}
