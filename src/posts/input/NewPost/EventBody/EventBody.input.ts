import { Field, InputType} from '@nestjs/graphql';
import { MaxLength, Length } from 'class-validator';

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
}
