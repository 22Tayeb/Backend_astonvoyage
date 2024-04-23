import express from "express";
import {createBookingDestCtrl, getAllBook,getAllBookByUser} from "../controllers/booking-destination.controller.js";


// Methode from express
const router = express.Router();

// API for destination
const createBookingDest = router.post('/createBook', createBookingDestCtrl);
const getAllBooking = router.get('/getAllBook', getAllBook);
const getAllBookingByUser = router.get('/getAllBook/:userId', getAllBookByUser);

// Export 
export const RouterBooking = {
    createBookingDest,
    getAllBooking,
    getAllBookingByUser

}
