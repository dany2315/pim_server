import express  from "express";
import {createListFournFile,reSaveFournisseurFile ,deleteContenuFile} from "../controller/categorieController/fileController.js"


const router = express.Router();

//http://localhost:5000/api/fournisseur/file


router.post('/',createListFournFile); //Appel CREE fourn dans listFourn
router.post('/resaveFile',reSaveFournisseurFile); //Appel CREE fourn dans listFourn
router.post('/deleteIdFile',deleteContenuFile);






export default router