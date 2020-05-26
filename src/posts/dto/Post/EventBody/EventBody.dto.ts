import { Field, ObjectType } from '@nestjs/graphql';

export class EventBody {
    @Field()
    eventTitle: string;

    @Field()
    body: string;

    @Field()
    inviteStatus: string;
}
