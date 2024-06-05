import mongoose from 'mongoose';


// Model of my document for my MangoDB BDD
const vols = mongoose.Schema({
    compagnie_vol:{
        type: String,
        required: true
    },
    num_vol:{
        type : String,
        required: true
    },
    heure_depart:{
        type: String,
        required:true
    },
    heure_arrivee:{
        type:String,
        required:true
    },
    aeroport_depart:{
        type:String,
        required:true
    },
    aeroport_arrivee:{
        type:String,
        required:true
    },
    info_comp:{
        type:String,
        required:true
    }
});

export default mongoose.model('Vols',vols)