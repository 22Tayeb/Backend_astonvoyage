import  jsonwebtoken  from "jsonwebtoken";

// authenticate's function
export const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({message :'token non fourni'});
    }
    jsonwebtoken.verify(token.split(' ')[1], process.env.TOKEN_SECRET, (err,decoded)=>{
        if(err){
            return res.status(401).json({message :'token non valid'});
        } 
        next()
    })

}

