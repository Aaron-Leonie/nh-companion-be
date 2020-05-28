import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
    user: {
        avatarUrl: String,
        userName: String,
        islandName: String,
        userId: String,
    },
    postType: String,
    textBody: {
        body: String,
    },
    eventBody: {
        eventId: Number,
        eventTitle: String,
        body: String,
        inviteStatus: String,
    },
},
{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
});
