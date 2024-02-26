import  Post  from "../models/post.model.js";
import { getCurrentUser } from "../services/user.service.js";

// function post create 
export const createPostCtrl = async (req,res)=>{
    req.body.like = []
    req.body.author = getCurrentUser()
    req.body.createdPost= new Date()

    const post = new Post(req.body)
   
    try {
        const response = await post.save()
        res.status(201).json({response})
    } catch(e) {    
        console.log(e)
        
        res.status(500).send(e)
    }
}
// function get posts
export const getPostsCtrl = async (req,res)=>{
    try{
        const response = await Post.find()
        res.status(200).json({response})
    } catch(error){
        res.status(500).send(error)
    }   
}
// function get post by his id 
export const getPostByIdCtrl = async (req,res)=>{
    try{
        const id =  req.params.id
        console.log(id);
        const response = await Post.findById(id)
        res.status(200).json({response})
    } catch(error){
        res.status(500).send(error)
    }   
}
// function udpate post by his id
export const updatePostByIdCtrl = async (req,res)=>{
    try{
        const body = req.body;
        const filter = { _id: req.params.id }
        console.log(body, filter);
        const response = await Post.findOneAndUpdate(filter, body);
        console.log(response)
        res.status(200).json({response:'Mise a jour effectué!'})
    } catch(error){
        res.status(500).send(error)
    }   
}
// function delate post
export const deletePostCtrl = async (req,res)=>{
    try{
        const id = req.params.id 
        const response = await Post.findByIdAndRemove(id)
        res.status(200).json({succes : "post by id " + response.id  + " was deleted!"})
    } catch(error){
        res.status(500).send(error)
    }
}

// function like post 
export const likePostCtrl = async (req,res)=>{

    const finduser = req.body.like.find((user) => user.mail === getCurrentUser().mail) 
    if(finduser){
        req.body.like = req.body.like.filter((user) => user.mail !== getCurrentUser().mail)
    } else {
        req.body.like.push(getCurrentUser())
    }
    try {
        const body = req.body
        const filter = {_id: req.params.id }
        const response = await Post.findOneAndUpdate(filter,req.body);
        res.status(200).json(body)
    } catch (error) {
        res.status(500).send(error)
    }

}