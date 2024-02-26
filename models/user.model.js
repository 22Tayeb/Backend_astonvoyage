import mongoose from 'mongoose';

// Model of my document for my MangoDB BDD
const prod = mongoose.Schema({
    role :{
        type: String,
        required: true 
    },
    departement :{
        type: String,
        required:true
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