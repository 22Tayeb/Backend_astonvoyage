import express from "express";
import {createUserCtrl, authenticateCtrl} from "../controllers/user.controller.js";

// Methode from express
const router = express.Router();

// API for user
const createUsr = router.post('/',createUserCtrl);
const authenticateUser = router.post('/authenticate', authenticateCtrl);

// Export 
export const RouterUser = {
    createUsr,
    authenticateUser
}

