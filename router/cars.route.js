import   express from "express";
import{createCarsCtrl}from "../controllers/cars.controller.js"


const router = express.Router();

// API for destination
const createCars = router.post('/createCars',createCarsCtrl);


export const RouterCars={
    createCars,
}