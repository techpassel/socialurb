import mongoose from 'mongoose';
import reactionSchema from './reactionModel.js'

const commentSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Post',
        },
        body: {
            type: String,
            require: true
        },
        reactions: [reactionSchema]
    },
    {
        timestamps: true
    }
)

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;