import  mongoose from 'mongoose';



// Model of my document for my MangoDB BDD
const destination = mongoose.Schema({
    nom_destination:{
        type: String,
        required: true 
    },
    description:{
        type: String,
        required: true
    },   
    image:{
       type: String,
       required: true 
    },
    vols:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Vols',
    }
});



export default mongoose.model('Destination',destination)