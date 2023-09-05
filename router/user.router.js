import express from "express";
import {createUserCtrl, authenticateCtrl} from "../controllers/user.controller.js";


const router = express.Router();

const createUsr = router.post('/',createUserCtrl);
const authenticateUser = router.post('/authenticate', authenticateCtrl);




export const RouterUser = {
    createUsr,
    authenticateUser
}

