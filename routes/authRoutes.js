import express  from "express";
import { login , register} from "../controller/authController.js"
const router = express.Router();

//http://localhost:5000/api/auth

router.post('/',login);
router.post('/register',register)



export default router