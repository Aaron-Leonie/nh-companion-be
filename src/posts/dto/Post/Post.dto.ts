import { Field, ObjectType, ID } from '@nestjs/graphql';
import { PostAuthor } from './PostAuthor/PostAuthor.dto';
import { TextBody } from './TextBody/TextBody.dto';
import { EventBody } from './EventBody/EventBody.dto';

@ObjectType()
export class Post {
    @Field(type => ID)
    postId: string;

    @Field(type => PostAuthor)
    user: PostAuthor;

    @Field()
    postType: string;

    @Field(type => TextBody, {nullable: true})
    textBody?: TextBody;

    @Field(type => EventBody, {nullable: true})
    eventBody?: EventBody;

    @Field(type => String)
    createdAt: string;
}
