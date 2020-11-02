import { Field, ID, ObjectType } from '@nestjs/graphql';
import { isNullableType } from 'graphql';

@ObjectType()
export class PublicUser {
    @Field(type => ID)
    userId: string;

    @Field({nullable: true})
    friendCode?: string;

    @Field({nullable: true})
    aboutText?: string;

    @Field({nullable: true})
    avatarUrl?: string;

    @Field()
    userName: string;

    @Field()
    islandName: string;
}