import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TextBody {
    @Field(type => String, {nullable: true})
    body: string;
}
