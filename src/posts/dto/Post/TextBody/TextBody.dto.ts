import { Field, ObjectType } from '@nestjs/graphql';

export class TextBody {
    @Field()
    body: string;
}
