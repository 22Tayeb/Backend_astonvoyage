import express from "express";
import {createUserCtrl, authenticateCtrl, getUsr} from "../controllers/user.controller.js";

// Methode from express
const router = express.Router();

// API for user
const createUsr = router.post('/',createUserCtrl);
const authenticateUser = router.post('/authenticate', authenticateCtrl);
const getUser = router.get('/getUsr', getUsr);

// Export 
export const RouterUser = {
    createUsr,
    authenticateUser,
    getUser
}

