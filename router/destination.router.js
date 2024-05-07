import express from "express";
import {createDest, getDest, getAllDest, updateDest, deleteDest,getAllDestByDate} from "../controllers/destination.controller.js";

// Methode from express
const router = express.Router();

// API for destination
const createDestination = router.post('/createDest',createDest);
const getDestination = router.get('/getDest/:id', getDest);
const getAllDestination = router.get('/getAllDest', getAllDest);
const updateDestination = router.put('/updateDest/:id', updateDest);
const deleteDestination = router.delete('/deleteDest/:id', deleteDest);
const getAllDestinationByDate=router.get('/getAllDestByDate',getAllDestByDate);

// Export 
export const RouterDest = {
    createDestination,
    getDestination,
    getAllDestination,
    updateDestination,
    deleteDestination,
    getAllDestinationByDate
}