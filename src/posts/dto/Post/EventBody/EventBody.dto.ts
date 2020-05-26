import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EventBody {
    @Field()
    eventTitle: string;

    @Field()
    body: string;

    @Field()
    inviteStatus: string;
}
