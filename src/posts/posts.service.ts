import { Injectable, Inject } from '@nestjs/common';
import { PostSchema } from './schemas/post.schema';
import { NewPost } from './input/NewPost/NewPost.input';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interface/Post.interface';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class PostsService {

    constructor(
        @InjectModel('Post') private readonly postModel: Model<Post>,
        @InjectModel('User') private readonly userModel: Model<User>
        ) {}

    async createPost(userId: string, newPost: NewPost): Promise<Post> {
        // Get User Who made post
        const user = await this.userModel.findOne({_id: userId});
        // Create Post following model
        const post = new this.postModel({
            ...newPost,
            user: {
                avatarUrl: user.avatarUrl,
                userName: user.userName,
                islandName: user.islandName,
                userId: user._id,
            },
        });
        // Save that post
        return post.save();
    }

    // TODO Research cursor pagination MONGO
    async getPostsForUser(userId: string, first: number, after: string) {
        const posts  = this.postModel.find()
    }
}
