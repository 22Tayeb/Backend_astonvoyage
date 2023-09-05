import mongoose from 'mongoose';

const prod = mongoose.Schema({
    role :{
        type: String,
        required: true 
    },
    nom :{
        type: String,
        required: true 
    },
    prenom :{
        type: String,
        required: true 
    },
    mail :{
        type: String,
        required: true 
    },
    mdp:{
        type: String,
        required: true 
    }
});

export default mongoose.model('User',prod)