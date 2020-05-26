import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Post } from './dto/Post/Post.dto';
import { NewPost } from './input/NewPost/NewPost.input';
import { CurrentUser } from '../lib/decorators/current-user.decorator';
import { PostsService } from './posts.service';
import { GqlAuthGaurd } from '../auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('Posts')
export class PostsResolver {

    constructor(private readonly postsService: PostsService) {}

    @Query(returns => String)
    async helloPosts(): Promise<string> {
        return 'Hello Posts';
    }

    @UseGuards(GqlAuthGaurd)
    @Mutation(returns => /* Post */ String)
    async createPost(
        @CurrentUser() user: any,
        @Args({name: 'newPost', type: () => NewPost})
        newPost: NewPost,
        ): Promise<string> {
        this.postsService.createPost(user.sub, newPost);
        return 'asdf';
    }
}
