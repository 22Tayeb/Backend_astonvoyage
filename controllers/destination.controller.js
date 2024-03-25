import Destination from "../models/destination.model.js";
import Vols from "../models/vols.model.js";

// function create destination
export const createDest = async (req,res)=>{
    console.log(req.body)
    const vols = new Vols(req.body.vols);
    const dest = new Destination(req.body)
    //save destination
    try{
        const responseVols = await vols.save()
        console.log(responseVols);
        dest.vols=responseVols._id;
        const response = await dest.save()
        res.status(201).json({response})
    }catch(err){
        res.status(500).json({erreur:"création de destination impossible", err})
    }
} 

export const getDest = async (req,res) => {
    const id = req.params.id
    const destination = await Destination.findById(id).populate('vols').exec();
    res.status(200).json(destination)
}

export const getAllDest = async (req,res) => {
    const allDest = await Destination.find({}).populate('vols');
    res.status(200).json(allDest)
}

export const updateDest = async (req,res)=>{
    try{
        const body = req.body;
        const filter = { _id: req.params.id }
        console.log(body, filter);
        const response = await Destination.findOneAndUpdate(filter, body).populate('vols');
        console.log(response)
        res.status(200).json({response:'Mise a jour effectué!'})
    } catch(error){
        res.status(500).send(error)
    }   
}

export const deleteDest = async (req,res)=>{
    try{
        const id = req.params.id 
        const response = await Destination.findByIdAndRemove(id)
        res.status(200).json({succes : "la déstination avec l'id ->" + response.id  + " a bien été supprimé!!!"})
    } catch(error){
        res.status(500).send(error)
    }
}