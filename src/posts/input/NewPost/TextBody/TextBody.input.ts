import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class TextBodyInput {

    @Field()
    @Length(1, 280)
    body: string;
}
