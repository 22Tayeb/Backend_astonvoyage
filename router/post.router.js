import express from "express";
import { createPostCtrl } from "../controllers/post.controller.js";
import { getPostsCtrl } from "../controllers/post.controller.js";
import { getPostByIdCtrl } from "../controllers/post.controller.js";
import { deletePostCtrl } from "../controllers/post.controller.js";


const router = express.Router();

const createPost = router.post('/', createPostCtrl)
const getPosts = router.get ('/', getPostsCtrl )
const getPostById = router.get('/:id',getPostByIdCtrl )
const deletePost= router.delete('/:id',deletePostCtrl )

export const RouterPost = {
    createPost,
    getPosts,
    getPostById,
    deletePost
}