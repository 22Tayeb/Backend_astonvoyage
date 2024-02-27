import express from 'express';
import mongoose from 'mongoose';
import bodyParser  from "body-parser";
import { RouterUser } from "./router/user.router.js";
import { RouterPost } from './router/post.router.js';
import cors  from "cors";
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({path: './config/.env'})

const app = express();
// Cors options 
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
app.UseHttpsRedirection()

// conection to my BDD
mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster.sr3t8lf.mongodb.net/social_network?retryWrites=true&w=majority&appName=Cluster',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    console.log('Connexion réussi à MangoDB');
}).catch((err) => console.log("failed to connect to MangoDB" ,err));


app.use(bodyParser.json());
// API USER
app.use('/api/user/', RouterUser.createUsr);
app.use('/api/user/', RouterUser.authenticateUser);
// API POST
app.use('/api/post/', RouterPost.createPost);
app.use('/api/post/', RouterPost.getPosts);
app.use('/api/post/', RouterPost.getPostById);
app.use('/api/post/', RouterPost.deletePost);
app.use('/api/post/', RouterPost.updatePostById);
app.use('/api/post/', RouterPost.likedPost)

app.get("/", (req,res) => {
    res.send('Bienvenue sur le backend de Together.');
});

// Acces serveur 
app.listen(process.env.PORT, () => {
  console.log( `Serveur démarré sur le port ${process.env.PORT}`);
});

