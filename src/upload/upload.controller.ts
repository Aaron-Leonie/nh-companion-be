import { Controller, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus, HttpCode, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import creds from '../keys/storagekey.json';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {

    constructor(private uploadService: UploadService) {}

    // TODO: Make module for google cloud storage
    // TODO: Create env switching for storage access
    // TODO: Maybe we want to save the full URL
    // TODO: Public bucket access? Proxy?
    // TODO: Research custom URL for storage.
    @Post('avatar')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(201)
    @UseInterceptors(FileInterceptor('avatar', {
        fileFilter: (req, file, cb) => {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                cb(null, true);
            }
            cb(null, false);
        },
    }))
    async uploadAvatar(@UploadedFile() avatar, @Request() req) {
        if (!avatar) {
            throw new HttpException('Bad file type', HttpStatus.BAD_REQUEST);
        }

        const storage = new Storage({credentials:{
            private_key: creds.private_key,
            client_email: creds.client_email,
        }});
        const bucket = storage.bucket('local-public');
        const fileName = uuidv4();

        const file = bucket.file(fileName);

        file.save(avatar.buffer, {contentType: avatar.mimetype})
            .then(async (res) => {
                await this.uploadService.saveAvatar(req.user.sub, fileName);
            })
            .catch((e) => {
                throw new HttpException('Storage Access failed', HttpStatus.INTERNAL_SERVER_ERROR);
            });
        return {
            message: 'Uploaded!',
            body: {
                avatarUrl: `https://storage.cloud.google.com/local-public/${fileName}`,
            },
        };
    }
}
