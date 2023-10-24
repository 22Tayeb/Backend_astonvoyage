import mongoose from 'mongoose';



const post = mongoose.Schema({
    author :{
        type: Object,
        required: true 
    },
    description :{
        type: String,
        required: true 
    },
    imageUrl :{
        type: String,
        required: false 
    },
    like :{
        type: Array,
        required: true 
    },
    createdPost:{
        type: Date,
        required: true 
    }
});

export default mongoose.model('Post',post)