import express  from "express";
import { importFileFtp , newFourn ,refreshFournisseurFtp ,getTimeMaj} from "../controller/categorieController/ftpController.js";

const router = express.Router();

//http://localhost:5000/api/fournisseur/ftp

router.post('/',importFileFtp);
router.post('/newFourn',newFourn);
router.post('/refreshFournisseurFtp',refreshFournisseurFtp)
router.get('/:collect',getTimeMaj)

 
export default router