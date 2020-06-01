import { Injectable, UnauthorizedException, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
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
        const userCheck = await this.userModel.findOne({$or: [{userName: newUser.userName}, {email: newUser.email}]});

        // Verification user isn't already created
        if (userCheck) {
            if (userCheck.userName === newUser.userName && userCheck.email === newUser.email) {
                throw new HttpException('Username & Email already exists.', HttpStatus.CONFLICT);
            } else if (userCheck.email === newUser.email){
                throw new HttpException('Email already exists.', HttpStatus.CONFLICT);
            } else if (userCheck.userName === newUser.userName) {
                throw new HttpException('Username already exists.', HttpStatus.CONFLICT);
            }
        }

        const createdUser = new this.userModel(newUser);
        return createdUser.save().then().catch( e => {throw new HttpException('Database Error', HttpStatus.INTERNAL_SERVER_ERROR); });
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
