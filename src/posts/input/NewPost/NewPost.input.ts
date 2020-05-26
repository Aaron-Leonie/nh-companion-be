import { Field, InputType} from '@nestjs/graphql';
import { TextBody } from './TextBody/TextBody.input';
import { EventBody } from './EventBody/EventBody.input';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class NewPost {
    @Field()
    @MaxLength(20)
    postType: string;

    @Field(type => TextBody, {nullable: true})
    @IsOptional()
    textBody?: TextBody;

    @Field(type => EventBody, {nullable: true})
    @IsOptional()
    eventBody?: EventBody;
}
