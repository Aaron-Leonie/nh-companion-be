import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: true,
      context: ({req}) => ({req}),
    }),
    // Modify connect URI for personal db environment. I used Docker here. 
    MongooseModule.forRoot('mongodb://localhost:27017/companion', {useNewUrlParser: true}),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
