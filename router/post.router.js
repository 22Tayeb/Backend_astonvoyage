import express from "express";
import { createPostCtrl, likePostCtrl } from "../controllers/post.controller.js";
import { getPostsCtrl } from "../controllers/post.controller.js";
import { getPostByIdCtrl } from "../controllers/post.controller.js";
import { deletePostCtrl } from "../controllers/post.controller.js";
import { updatePostByIdCtrl } from "../controllers/post.controller.js";
import { authenticate } from "../middlewares/authenticate.js";



const router = express.Router();

const createPost = router.post('/', createPostCtrl)
const getPosts = router.get('/', getPostsCtrl )
const getPostById = router.get('/:id',getPostByIdCtrl )
const deletePost= router.delete('/:id',deletePostCtrl )
const updatePostById = router.put('/:id',updatePostByIdCtrl )
const likedPost = router.put('/like/:id',authenticate,likePostCtrl)

export const RouterPost = {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    updatePostById,
    likedPost
}