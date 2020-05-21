import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginPayload {
    @Field(type => ID)
    userId: string;
    @Field()
    token: string;
}
