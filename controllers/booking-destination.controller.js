import bookingdestination from "../models/booking-destination.model.js";
import mongoose from 'mongoose';



export const getAllBook = async (req, res) => {
    const allbooking = await bookingdestination.find({});
    res.status(200).json(allbooking)
}

export const getAllBookByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const books = await bookingdestination.find({ userId }).populate('destinationId').exec();
        res.status(200).json(books)
    } catch (e) {
        res.status(500).json(e)
    }
}
export const createMyBooking = async (req, res) => {
    //console.log(req.body)
    const userId = new mongoose.Types.ObjectId(req.body.userId)
    const destinationId = new mongoose.Types.ObjectId(req.body.destinationId)
    const myBooking = new bookingdestination({ userId, destinationId }) //{userId:4355435, destinationId:3555355}
    try {
        const response = await myBooking.save()
        res.status(201).json({ response, message: 'Booking réservé, paiement accepte' })
    } catch (err) {
        res.status(500).json({ erreur: "Booking non réservé, paiement refuse" })
    }
}