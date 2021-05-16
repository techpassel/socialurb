import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import postModel from '../models/postModel.js';
import commentModel from '../models/commentModel.js';
import mongoose from 'mongoose';
import e from "express";

const getPosts = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await postModel.find({ userId })
        res.json(posts);
    } catch (error) {
        throw new Error(error.message);
    }
})

const getPostDetails = asyncHandler(async (req, res) => {
    try {
        const { postId: _id } = req.params;
        const postDetails = await postModel.findOne({ _id })
        if (postDetails) {
            res.json(postDetails);
        } else {
            res.status(StatusCodes.BAD_REQUEST)
            throw new Error('Post not found');
        }
    } catch (error) {
        throw new Error(error.message);
    }
})

const createPost = asyncHandler(async (req, res) => {
    try {
        const { userId, body, imageUrl } = req.body;
        const post = await postModel.create({ userId, body, imageUrl });
        res.json(post)
    } catch (error) {
        throw new Error(error.message);
    }
})

const updatePost = asyncHandler(async (req, res) => {
    try {
        const { postId: _id, body } = req.body;
        const updatedPost = await postModel.findOneAndUpdate({ _id }, { $set: { body } }, { new: true });
        res.json(updatedPost)
    } catch (error) {
        throw new Error(error.message);
    }
})

const deletePost = asyncHandler(async (req, res) => {
    try {
        const { postId: _id } = req.params;
        await postModel.deleteOne({ _id });
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        throw new Error(error.message);
    }
})

const getComments = asyncHandler(async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await commentModel.find({ postId })
        res.json(comments)
    } catch (error) {
        throw new Error(error.message);
    }
})

const createComment = asyncHandler(async (req, res) => {
    try {
        const { userId, postId, body } = req.body;
        const comment = await commentModel.create({ userId, postId, body });
        res.json(comment)
    } catch (error) {
        throw new Error(error.message);
    }
})

const updateComment = asyncHandler(async (req, res) => {
    try {
        const { commentId: _id, body } = req.body;
        const updatedComment = await commentModel.findOneAndUpdate({ _id }, { $set: { body } }, { new: true });
        res.json(updatedComment)
    } catch (error) {
        throw new Error(error.message);
    }
})

const deleteComment = asyncHandler(async (req, res) => {
    try {
        const { commentId: _id } = req.params;
        await commentModel.deleteOne({ _id });
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        throw new Error(error.message);
    }
})

const getReactionsByPostId = asyncHandler(async (req, res) => {
    try {
        const { postId: _id } = req.params
        const postReactions = await postModel.findById(_id, { _id: 0, reactions: 1 });
        res.json(postReactions.reactions)
    } catch (error) {
        throw new Error(error.message);
    }
})

const createPostReaction = asyncHandler(async (req, res) => {
    try {
        const { postId: _id, userId, type } = req.body;
        // const reactionExist = await postModel.exists({_id, "reactions.userId": userId});
        let postReaction = await postModel.findOneAndUpdate({ _id, "reactions.userId": userId }, { $set: { "reactions.$.type": type } }, { new: true, fields: {_id:0, reactions: 1} });
        if (!postReaction) {
            postReaction = await postModel.findOneAndUpdate({ _id }, { $push: { reactions: { userId, type } } }, { new: true, fields: {_id:0, reactions: 1} });
        }
        res.send(postReaction.reactions);
    } catch (error) {
        throw new Error(error.message);
    }
})

const deletePostReaction = asyncHandler(async (req, res) => {
    try {
        const { postId: _id, reactionId } = req.params;
        const postReaction = await postModel.findByIdAndUpdate({_id}, {$pull: {reactions: {_id: reactionId}}}, {new: true, fields: {_id:0, reactions: 1}});
        res.send(postReaction.reactions);
    } catch (error) {
        throw new Error(error.message);
    }
})

const getReactionsByCommentId = asyncHandler(async (req, res) => {
    try {
        const { commentId: _id } = req.params
        const commentReactions = await commentModel.findById(_id, { _id: 0, reactions: 1 });
        res.json(commentReactions.reactions)
    } catch (error) {
        throw new Error(error.message);
    }
})

const createCommentReaction = asyncHandler(async (req, res) => {
    try {
        const { commentId: _id, userId, type } = req.body;
        // const reactionExist = await commentModel.exists({_id, "reactions.userId": userId});
        let commentReaction = await commentModel.findOneAndUpdate({ _id, "reactions.userId": userId }, { $set: { "reactions.$.type": type } }, { new: true, fields: {_id:0, reactions: 1} });
        if (!commentReaction) {
            commentReaction = await commentModel.findOneAndUpdate({ _id }, { $push: { reactions: { userId, type } } }, { new: true, fields: {_id:0, reactions: 1} });
        }
        res.send(commentReaction.reactions);
    } catch (error) {
        throw new Error(error.message);
    }
})

const deleteCommentReaction = asyncHandler(async (req, res) => {
    try {
        const { commentId: _id, reactionId } = req.params;
        const commentReaction = await commentModel.findByIdAndUpdate({_id}, {$pull: {reactions: {_id: reactionId}}}, {new: true, fields: {_id:0, reactions: 1}});
        res.send(commentReaction.reactions);
    } catch (error) {
        throw new Error(error.message);
    }
})

const createPostShare = asyncHandler(async (req, res) => {
    try {
        res.send();
    } catch (error) {
        throw new Error(error.message)
    }
})

const deletePostShare = asyncHandler(async (req, res) => {
    try {
        res.send();
    } catch (error) {
        throw new Error(error.message)
    }
})

export {
    getPosts,
    getPostDetails,
    createPost,
    updatePost,
    deletePost,
    getComments,
    createComment,
    updateComment,
    deleteComment,
    getReactionsByPostId,
    createPostReaction,
    deletePostReaction,
    getReactionsByCommentId,
    createCommentReaction,
    deleteCommentReaction,
    createPostShare,
    deletePostShare
}