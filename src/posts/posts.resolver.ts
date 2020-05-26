import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Post } from './dto/Post/Post.dto';
import { NewPost } from './input/NewPost/NewPost.input';

@Resolver('Posts')
export class PostsResolver {

    @Query(returns => String)
    async helloPosts(): Promise<string> {
        return 'Hello Posts';
    }

    @Mutation(returns => Post)
    async createPost(
        @Args({name: 'newPost', type: () => NewPost})
        newPost: NewPost,
        ): Promise<Post> {
        return null;
    }
}
