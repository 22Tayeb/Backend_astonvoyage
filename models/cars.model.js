import mongoose from 'mongoose';

// Model of my document for my MangoDB BDD
// création du model pour l'administrateur
const cars = mongoose.Schema({
    
    name_cars:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }
});

export default mongoose.model('Cars',cars)