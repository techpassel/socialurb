import mongoose from 'mongoose';
import reactionSchema from './reactionModel.js'

const postSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        body: {
            type: String,
            required: false,
        },
        imageUrl: {
            type: String,
            required: false
        },
        reactions: [reactionSchema]
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model('Post', postSchema);
export default Post;