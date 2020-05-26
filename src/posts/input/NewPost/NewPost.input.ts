import { Field, InputType} from '@nestjs/graphql';
import { TextBodyInput } from './TextBody/TextBody.input';
import { EventBodyInput } from './EventBody/EventBody.input';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class NewPost {
    @Field()
    @MaxLength(20)
    postType: string;

    @Field(type => TextBodyInput, {nullable: true})
    @IsOptional()
    textBody?: TextBodyInput;

    @Field(type => EventBodyInput, {nullable: true})
    @IsOptional()
    eventBody?: EventBodyInput;
}
