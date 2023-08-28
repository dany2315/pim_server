import express  from "express";
import { importFileFtp } from "../controller/categorieController/ftpController.js";

const router = express.Router();

//http://localhost:5000/api/fournisseur/ftp

router.post('/',importFileFtp);


 
export default router