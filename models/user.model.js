import mongoose from 'mongoose';

// Model of my document for my MangoDB BDD
const prod = mongoose.Schema({
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
        required: true,
        unique:true 
    },
    mdp:{
        type: String,
        required: true 
    }
});

export default mongoose.model('User',prod)