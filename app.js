import express from 'express';
import mongoose from 'mongoose';
import bodyParser  from "body-parser";
import { RouterUser } from "./router/user.router.js";
import { RouterPost } from './router/post.router.js';
import cors  from "cors";

const app = express();

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


mongoose.connect('mongodb+srv://toto:toto123@cluster.sr3t8lf.mongodb.net/social_network?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    console.log('connexion succes');
}).catch(err => console.log(err));


app.use(bodyParser.json());

app.use('/api/user/', RouterUser.createUsr);
app.use('/api/user/', RouterUser.authenticateUser);

app.use('/api/post/', RouterPost.createPost);
app.use('/api/post/', RouterPost.getPosts);
app.use('/api/post/', RouterPost.getPostById);
app.use('/api/post/', RouterPost.deletePost);
app.use('/api/post/', RouterPost.updatePostById);

app.use('/api/post/', RouterPost.likedPost)

app.get('/', (req,res) => {
    
    res.send('Bienvenue sur le backend de Eleve-app.');
});

