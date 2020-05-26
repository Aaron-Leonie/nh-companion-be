import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGaurd } from '../auth.guard';
import { UseGuards } from '@nestjs/common';
import { NewUser } from './dto/NewUser.dto';
import { NewUserInput } from './input/NewUserInput.input';
import { UsersService } from './users.service';
import { CurrentUser } from '../lib/decorators/current-user.decorator';
import { LoginPayload } from './dto/LoginPayload.dto';
import { LoginInput } from './input/LoginInput.dto';
import { User } from './dto/User.dto';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

@Resolver('Users')
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    // Get user object from token
    @UseGuards(GqlAuthGaurd)
    @Query(returns => User)
    async getCurrentUser(@CurrentUser() user): Promise<User> {
        return await this.usersService.getUser(user);
    }

    // Register new User
    @Mutation(returns => NewUser)
    async createUser(
        @Args('input') input: NewUserInput,
        @Args({ name: 'avatar', type: () => GraphQLUpload, nullable: true })
        // {
        //     createReadStream,
        //     filename,
        // }
        file: FileUpload): Promise<NewUser> {
        // createReadStream()
        //     .pipe(createWriteStream(`../uploads/${filename}`));
        const newUser = await this.usersService.createNewUser(input);
        return {
            userId: newUser._id,
        } as NewUser;
    }

    // Auth user and send user token
    @Mutation(returns => LoginPayload)
    async login(@Args('input') input: LoginInput): Promise<LoginPayload> {
        const loggedInUser = await this.usersService.login(input);
        return {
            token: loggedInUser.access_token,
            userId: loggedInUser.userId,
        } as LoginPayload;
    }

    @Mutation(returns => String)
    async image(@Args({ name: 'avatar', type: () => GraphQLUpload }) image): Promise<string> {
        return 'fuck';
    }
}
