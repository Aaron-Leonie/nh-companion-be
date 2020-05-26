import  {Document } from 'mongoose';

export interface Post extends Document {
    user: {
        avatarUrl: String,
        userName: String,
        islandName: String,
        userId: String,
    };

    postType: String;
    textBody: {
        body: String,
    };

    eventBody: {
        eventTitle: String,
        body: String,
        inviteStatus: String,
    };
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    };
}