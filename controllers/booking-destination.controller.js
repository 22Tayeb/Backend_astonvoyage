import bookingdestination from "../models/booking-destination.model.js";
import mongoose from 'mongoose';


//recupere tout les booking
export const getAllBook = async (req, res) => {
    const allbooking = await bookingdestination.find({});
    res.status(200).json(allbooking)
}

export const getAllBookByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        //sert a récupérer les userId dans le bookingDestination et recupere les destination Id
        let books = await bookingdestination.find({ userId }).populate('destinationId').exec();
        //temporaire

        books = books.filter((el)=> el.destinationId)
        res.status(200).json(books)
    } catch (e) {
        res.status(500).json(e)
    }
}
export const createMyBooking = async (req, res) => {
    //console.log(req.body)
    try {
    if(!req.body.userId||!req.body.destinationId){
        throw('pas id recu')
    }
    const userId = new mongoose.Types.ObjectId(req.body.userId)
    const destinationId = new mongoose.Types.ObjectId(req.body.destinationId)
    const myBooking = new bookingdestination({ userId, destinationId }) //{userId:4355435, destinationId:3555355}
    
        const response = await myBooking.save()
        res.status(201).json({ response, message: 'Booking réservé, paiement accepte' })
    } catch (err) {
        res.status(500).json({ erreur: "Booking non réservé, paiement refuse", err })
    }
}