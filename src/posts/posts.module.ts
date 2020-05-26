import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { UserSchema } from '../users/users.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Post', schema: PostSchema}, {name: 'User', schema: UserSchema}]),
  ],
  providers: [PostsResolver, PostsService]
})
export class PostsModule {}
