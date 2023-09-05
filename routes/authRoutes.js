import express  from "express";
import { login } from "../controller/authController.js"
const router = express.Router();

//http://localhost:5000/api/auth

router.post('/',login);



export default router