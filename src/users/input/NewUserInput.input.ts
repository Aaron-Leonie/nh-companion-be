import { Field, ID, InputType } from '@nestjs/graphql';
import {IsEmail, IsNotEmpty, MinLength, Max, MaxLength} from 'class-validator';

@InputType()
export class NewUserInput {
    @IsEmail()
    @Field()
    email: string;

    @Field()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    // TODO: Make not nullable
    @Field(type => String, {nullable: true})
    @IsNotEmpty()
    @MaxLength(50)
    islandName: string;

    @Field(type => String, {nullable: true})
    @IsNotEmpty()
    @MaxLength(20)
    userName: string;
}
