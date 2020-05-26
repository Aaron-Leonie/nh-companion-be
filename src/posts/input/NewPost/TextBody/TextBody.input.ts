import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class TextBody {

    @Field()
    @Length(1, 280)
    body: string;
}
