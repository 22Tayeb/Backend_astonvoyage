import express from 'express';
import mongoose from 'mongoose';
import bodyParser  from "body-parser";
import { RouterUser } from "./router/user.router.js";
import { RouterPost } from './router/post.router.js';

const app = express();

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

app.listen(3000, () => {
    console.log('server is running at localhost 3000');
});

