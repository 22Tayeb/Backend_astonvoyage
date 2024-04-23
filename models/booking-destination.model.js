import  mongoose from 'mongoose';

// Model of my document for my MangoDB BDD
const bookingdestination = mongoose.Schema({
    nom_destination:{
        type: String,
        required: true 
    },
    description:{
        type: String,
        required: true
    },
    prix:{
        type:String,
        required:true
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
    }

});

export default mongoose.model('Bookingdest', bookingdestination)