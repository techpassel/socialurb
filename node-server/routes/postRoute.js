import express from 'express';
import {
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
} from '../controllers/postController.js';
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

//Routes related to posts
router.get('/:userId', getPosts);
router.get('/details/:postId', getPostDetails);
router.post('/', protect, createPost);
router.put('/', protect, updatePost);
router.delete('/:postId', protect, deletePost);

//Routes related to comments
router.get('/comment/:postId', getComments);
router.post('/comment', protect, createComment);
router.put('/comment', protect, updateComment);
router.delete('/comment/:commentId', protect, deleteComment);

//Routes related to reactions on posts
router.get('/reaction/:postId', getReactionsByPostId);
router.post('/reaction', protect, createPostReaction);
router.delete('/reaction/:postId/:reactionId', protect, deletePostReaction);

//Routes related to reactions on comments
router.get('/comment/reaction/:commentId', getReactionsByCommentId);
router.post('/comment/reaction', protect, createCommentReaction);
router.delete('/comment/reaction/:commentId/:reactionId', protect, deleteCommentReaction);

//Routes related to share of post
router.post('/share', createPostShare);
router.delete('/share', deletePostShare);

export default router;