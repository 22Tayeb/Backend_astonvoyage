import mongoose from 'mongoose';

// Model of my document for my MangoDB BDD
const bookingdestination = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    destinationId: {type: mongoose.Schema.Types.ObjectId, ref: 'Destination'},

});

export default mongoose.model('Bookingdest', bookingdestination)