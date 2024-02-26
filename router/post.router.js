import express from "express";
import { createPostCtrl, likePostCtrl } from "../controllers/post.controller.js";
import { getPostsCtrl } from "../controllers/post.controller.js";
import { getPostByIdCtrl } from "../controllers/post.controller.js";
import { deletePostCtrl } from "../controllers/post.controller.js";
import { updatePostByIdCtrl } from "../controllers/post.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

// Methode from express 
const router = express.Router();
// API of creation with middlewares
const createPost = router.post('/',authenticate,createPostCtrl)
// API of navigation with middlewares 
const getPosts = router.get('/', authenticate,getPostsCtrl )
const getPostById = router.get('/:id',authenticate,getPostByIdCtrl )
const deletePost= router.delete('/:id',authenticate,deletePostCtrl )
const updatePostById = router.put('/:id',authenticate,updatePostByIdCtrl )
const likedPost = router.put('/like/:id',authenticate,likePostCtrl)

// export 
export const RouterPost = {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    updatePostById,
    likedPost
}