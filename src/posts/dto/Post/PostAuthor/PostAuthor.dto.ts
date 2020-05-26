import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostAuthor {
    @Field()
    avatarUrl: string;

    @Field()
    userName: string;

    @Field()
    islandName: string;

    @Field()
    userId: string;
}
