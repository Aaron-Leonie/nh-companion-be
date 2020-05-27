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
    @Mutation(returns => Post)
    async createPost(
        @CurrentUser() user: any,
        @Args({name: 'newPost', type: () => NewPost})
        newPost: NewPost,
        ): Promise<any> {

        const dbResult = await this.postsService.createPost(user.sub, newPost);
        const postResult = {
            postId: dbResult._id,
            user: {
                avatarUrl: dbResult.user.avatarUrl,
                userId: dbResult.user.userId,
                islandName: dbResult.user.islandName,
                userName: dbResult.user.userName,
            },
            postType: dbResult.postType,
            eventBody: {
                eventTitle: dbResult.eventBody.eventTitle,
                body: dbResult.eventBody.body,
                inviteStatus: dbResult.eventBody.inviteStatus,
            },
            textBody: {
                body: dbResult.textBody.body,
            },
        } as Post;
        return  postResult;
    }
}
