import  jsonwebtoken  from "jsonwebtoken";

// authenticate's function
export const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({message :'token non fourni'});
    }
    jsonwebtoken.verify(token.split(' ')[1], "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", (err,decoded)=>{
        if(err){
            return res.status(401).json({message :'token non valid'});
        } 
        next()
    })

}

