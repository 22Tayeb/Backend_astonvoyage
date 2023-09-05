import  Post  from "../models/post.model.js";

export const createPostCtrl = async (req,res)=>{
    console.log(req.body)
    const p = new Post(req.body)
   
    try {
        const response = await p.save()
        res.status(201).json({response})
    } catch(e) {
        res.status(500).send(e)
    }
}
export const getPostsCtrl = async (req,res)=>{
    try{
        const response = await Post.find()
        res.status(200).json({response})
    } catch(error){
        res.status(500).send(error)
    }   
}
export const getPostByIdCtrl = async (req,res)=>{
    try{
        const id =  req.params.id
        const response = await Post.findById(id)
        res.status(200).json({response})
    } catch(error){
        res.status(500).send(error)
    }   
}

export const deletePostCtrl = async (req,res)=>{
    try{
        const id = req.params.id 
        const response = await Post.findByIdAndRemove(id)
        res.status(200).json({succes : "post by id " + response.id  + " was deleted!"})
    } catch(error){
        res.status(500).send(error)
    }
}