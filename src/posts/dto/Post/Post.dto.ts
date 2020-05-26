import { Field, ObjectType } from '@nestjs/graphql';
import { PostAuthor } from './PostAuthor/PostAuthor.dto';
import { TextBody } from './TextBody/TextBody.dto';
import { EventBody } from './EventBody/EventBody.dto';

@ObjectType()
export class Post {
    @Field(type => PostAuthor)
    author: PostAuthor;

    @Field()
    postType: string;

    @Field(type => TextBody, {nullable: true})
    textBody?: TextBody;

    @Field(type => EventBody, {nullable: true})
    eventBody?: EventBody;
}
