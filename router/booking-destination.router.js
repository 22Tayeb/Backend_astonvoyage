import express from "express";
import { getAllBook,getAllBookByUser,createMyBooking} from "../controllers/booking-destination.controller.js";


// Methode from express
const router = express.Router();

// API for destination
const getAllBooking = router.get('/getAllBook', getAllBook);
const getAllBookingByUser = router.get('/getAllBook/:userId', getAllBookByUser);
const myBooking=router.post('/myBook',createMyBooking);


// Export 
export const RouterBooking = {
    getAllBooking,
    getAllBookingByUser,
    myBooking

}
