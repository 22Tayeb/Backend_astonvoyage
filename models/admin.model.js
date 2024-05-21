import mongoose from 'mongoose';

// Model of my document for my MangoDB BDD
// création du model pour l'administrateur
const admin = mongoose.Schema({
    
    mail :{
        type: String,
        required: true,
        unique:true 
    },
    mdp:{
        type: String,
        required: true ,
        unique:true
    }
});

export default mongoose.model('Admin',admin)