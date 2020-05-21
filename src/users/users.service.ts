import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import {Model} from 'mongoose';
import { User } from './interfaces/user.interface';
import { NewUserInput } from './input/NewUserInput.input';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private jwtService: JwtService,
        ) {}

    // Implement Password hashing
    async createNewUser(newUser: NewUserInput): Promise<User> {
        const createdUser = new this.userModel(newUser);
        return createdUser.save();
    }

    // Need password hashing here too.
    async validateUser(newUser: NewUserInput) {
        const user = await this.userModel.findOne({email: newUser.email});
        if (user && user.password === newUser.password) {
            return user;
        }
        return null;
    }

    async login(user: any) {

        const validUser = await this.validateUser(user);
        if (!validUser) {
            throw new UnauthorizedException();
        }
        const payload = {email: validUser.email, sub: validUser._id};
        return {
            userId: validUser._id,
            access_token: this.jwtService.sign(payload),
        };
    }

    async getUser(user: any) {
        return await this.userModel.findOne({_id: user.sub});
    }
}
