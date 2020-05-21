import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    JwtModule.register({
      secret: 'asdfasdfasdfasdf123',
      signOptions: {expiresIn: '30d'},
    }),
  ],
  providers: [UsersResolver, UsersService, JwtStrategy]
})
export class UsersModule {}
