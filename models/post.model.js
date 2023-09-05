import mongoose from 'mongoose';

const post = mongoose.Schema({
    userId :{
        type: Number,
        required: true 
    },
    description :{
        type: String,
        required: true 
    },
    image :{
        type: String,
        required: false 
    },
    like :{
        type: Number,
        required: true 
    },
    date:{
        type: String,
        required: false 
    }
});

export default mongoose.model('Post',post)