import User from "../models/user.model.js";
import { setCurrentUser } from "../services/user.service.js";
import  jsonwebtoken  from "jsonwebtoken";
import bcrypt from "bcrypt";

// Security for Bcrypt
const saltRounds = 10;

// function create user
export const createUserCtrl = async (req,res)=>{
    const u = new User(req.body)
    // hash of the password 
    try {
       let userHash = await bcrypt.hash(u.mdp, saltRounds)
       console.log(userHash);
       u.mdp = userHash
    try{
        const response = await u.save()
        res.status(201).json({response})
    }catch(err){
        res.status(500).json({erreur:"création impossible"})
    }
    } catch (error) {
        console.log("erreur d'iddentification", error.message);
    } 
}

// function authenticate 
export const authenticateCtrl = async (req,res)=> {
    const mail = req.body.mail;
    const mdp = req.body.mdp;
    // bcrypt authentification 
    try {
        const user = await User.findOne({mail });
        bcrypt.compare(mdp, user.mdp, function(err, result) {
            if(err || result == false){
                res.status(401).json({erreur:"Mot de passe ou utilisateur incorect"})
                return
            }
            console.log("result", result);
            const accessToken = jsonwebtoken.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
            const refreshToken = jsonwebtoken.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
            res.status(200).json({user,accessToken, refreshToken})
        })
        setCurrentUser(user)
    } catch(err)  {
        console.log("erreur",err);
        res.status(401).json({erreur:"cet utilisateur n'existe pas"})
    }
}
