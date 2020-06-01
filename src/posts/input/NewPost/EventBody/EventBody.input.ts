import { Field, InputType, Int} from '@nestjs/graphql';
import { MaxLength, Length, IsNumber } from 'class-validator';

@InputType()
export class EventBodyInput {
    @Field()
    @MaxLength(120)
    eventTitle: string;

    @Field()
    @Length(1, 280)
    body: string;

    @Field()
    @MaxLength(120)
    inviteStatus: string;

    @Field(type => Int)
    @IsNumber()
    eventId: number;
}
