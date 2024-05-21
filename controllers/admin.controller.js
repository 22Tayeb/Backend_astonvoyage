import adminModel from "../models/admin.model.js";
import bcrypt from "bcrypt";
import  jsonwebtoken  from "jsonwebtoken";
import { setCurrentUser } from "../services/user.service.js";
import { getCurrentAdmin, setCurrentAdmin } from "../services/admin.service.js";


const saltRounds = 10;
export const createAdminCtrl = async (req,res)=>{
    const u = new admin(req.body)
    // hash  le mdp
    try {
        //bcrypt.hash sert à hasher le mot de passe
       let adminHash = await bcrypt.hash(u.mdp, saltRounds)
       console.log(adminHash);
       u.mdp = adminHash  //stock  le mdp hasher dans le mdp
    try{
        //u.save() sert a sauvegarder le new admin
        const response = await u.save()
        res.status(201).json({response,message: 'Administrateur crée'})
    }catch(err){
        res.status(500).json({erreur:"création impossible"})
    }
    } catch (error) {
        console.log("erreur d'iddentification", error.message);
    } 

    
}

export const authenticateCtrl = async (req,res)=> {
    const mail = req.body.username;
    const mdp = req.body.password;
    // bcrypt authentification 
    try {
        const admin = await adminModel.findOne({mail });
        console.error("1",admin)
        bcrypt.compare(mdp, admin.mdp, function(err, result) {
           console.error("2", err, result)
           console.log("result", result);

            if(err || result == false){
                res.status(401).json({erreur:"Mot de passe ou utilisateur incorect"})
                return
            }
            const accessToken = jsonwebtoken.sign({ userId: admin._id }, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", { expiresIn: '1d' });
            const refreshToken = jsonwebtoken.sign({ userId: admin._id }, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", { expiresIn: '7d' });
            res.status(200).json({admin,accessToken, refreshToken})
        })
        setCurrentAdmin(admin)
    } catch(err)  {
        console.log("erreur",err);
        res.status(401).json({erreur:"cet utilisateur n'existe pas"})
    }
}

export const logoutAdminCtrl = async (req,res)=>{
    setCurrentAdmin(null)
    if(getCurrentAdmin()==null){
        res.status(200).json({message:'session utlisateur supprimé avec succès'})
        
        
    }else{
        res.status(500).json({message:'session utilisateur toujours actif'})
    }
}