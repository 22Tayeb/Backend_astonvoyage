import User from "../models/user.model.js";
import { setCurrentUser } from "../services/user.service.js";
import  jsonwebtoken  from "jsonwebtoken";

export const secretKey = "Jesuislakey";

export const createUserCtrl = async (req,res)=>{
    const u = new User(req.body)
        const response = await u.save()
        res.status(201).json({response})
}

export const authenticateCtrl = async (req,res)=> {
    const mail = req.body.username;
    const mdp = req.body.password;


    try {
        const user = await User.findOne({mail, mdp });
        setCurrentUser(user)

        const accessToken = jsonwebtoken.sign({ userId: user._id }, secretKey, { expiresIn: '1d' });
        const refreshToken = jsonwebtoken.sign({ userId: user._id }, secretKey, { expiresIn: '7d' });



       res.status(200).json({user,accessToken, refreshToken})

    } catch(err)  {
        res.status(401).json({erreur:"cet utilisateur n'existe pas"})
    }
}
