import User from "../models/user.model.js";

export const createUserCtrl = async (req,res)=>{
    const u = new User(req.body)
        const response = await u.save()
        res.status(201).json({response})
}

export const authenticateCtrl = async (req,res)=> {
    const mail = req.body.mail;
    const mdp = req.body.password;

    try {
        const userFound = await User.findOne({mail, mdp });
       res.status(200).json({user: userFound})

    } catch(err)  {
        res.status(500).json(err)
    }
}

