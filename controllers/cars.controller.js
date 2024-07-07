import cars from "../models/cars.model.js";

export const createCarsCtrl = async (req,res)=>{
    const u = new cars(req.body)
    try{
        const response = await u.save()
        res.status(201).json({response,message: ' Voiture pas crée'})
    }catch(err){
        res.status(500).json({erreur:"création impossible"})
    }
}

