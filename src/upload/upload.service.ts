import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/interfaces/user.interface';
import { Model } from 'mongoose';

@Injectable()
export class UploadService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        ) {}

    async saveAvatar(userId: string, avatarId: string): Promise<User> {
        const user = await this.userModel.findOne({_id: userId});

        if (!user) {
            throw new HttpException('Database Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return user.updateOne({avatarId});
    }
}
