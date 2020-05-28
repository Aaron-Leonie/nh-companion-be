import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class EventBody {
    @Field(type => String, {nullable: true})
    eventTitle: string;

    @Field(type => String, {nullable: true})
    body: string;

    @Field(type => String, {nullable: true})
    inviteStatus: string;

    @Field(type => Int, {nullable: true})
    eventId: number;
}
