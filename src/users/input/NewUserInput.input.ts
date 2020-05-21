import { Field, ID, InputType } from '@nestjs/graphql';
import {IsEmail, IsNotEmpty, MinLength} from 'class-validator';

@InputType()
export class NewUserInput {
    @IsEmail()
    @Field()
    email: string;

    @Field()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
