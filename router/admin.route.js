import  express from "express";
import {createAdminCtrl,authenticateCtrl, logoutAdminCtrl} from "../controllers/admin.controller.js";


// Methode from express
const router = express.Router();

// API pour creer un administrateur
const createAdmin = router.post('/createAdmin',createAdminCtrl);
const authenticateAdmin= router.post('/authenticateAdmin',authenticateCtrl)
const logoutAdmin= router.post('/logoutAdmin',logoutAdminCtrl)




export const RouterAdmin = {
    createAdmin,
    authenticateAdmin,
    logoutAdmin
}