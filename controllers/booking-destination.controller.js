import bookingdestination from "../models/booking-destination.model.js";

// function create user
export const createBookingDestCtrl = async (req,res)=>{

    const book = new bookingdestination(req.body)
    console.log(req.body)
    try{
        const response = await book.save()
        res.status(201).json({response,message: 'Booking crée'})
    }catch(err){
        res.status(500).json({erreur:"Booking impossible"})
    }
}


    export const getAllBook = async (req,res) => {
        const allbooking = await bookingdestination.find({});
        res.status(200).json(allbooking)
    }
    
    export const getAllBookByUser = async (req,res) => {
        const userId = req.params.userId
        console.log('ihih',userId)

        const allbooking = await bookingdestination.find({user:userId});
        res.status(200).json(allbooking)
    }