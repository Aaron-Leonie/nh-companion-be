import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthGuard } from '../auth.guard';
import { UseGuards } from '@nestjs/common';
import { NewUser } from './dto/NewUser.dto';
import { NewUserInput } from './input/NewUserInput.input';

@Resolver('Users')
export class UsersResolver {
    constructor() {}

    @UseGuards(AuthGuard)
    @Query(() => String)
    async hello() {
        return 'asdf';
    }

    @Mutation(returns => NewUser)
    async createUser(@Args('input') input: NewUserInput): Promise<NewUser> {
        console.log(input);
        return {
            token: 'asdfasdf',
            userId: 'asdfasdf',
        } as NewUser;
    }
}
