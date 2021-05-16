import mongoose from 'mongoose';
import {ReactionTypes} from '../constants/modelConstants.js'

const reactionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ReactionTypes,
        required: true,
        default: ReactionTypes.Like
    }
})

export default reactionSchema;