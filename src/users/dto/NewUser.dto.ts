import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NewUser {
    @Field(type => ID)
    userId: string;
    @Field()
    token: string;
}
