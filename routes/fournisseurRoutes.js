import express  from "express";
import {getFournisseurs,getPlein,createFournisseur,getCategories} from "../controller/fournisseurController.js"
import ftpRoutes from "./ftpRoutes.js"
import fileRoutes from "./fileRoutes.js"
import urlRoutes from "./urlRoutes.js"


const router = express.Router();

//http://localhost:5000/api/fournisseur
//Router pour chaque categories 
router.post('/',getFournisseurs);
router.use("/ftp",ftpRoutes);
router.use("/url",urlRoutes);
router.use("/file",fileRoutes);


//route qui marche pour chaque categories de fournisseur

router.get('/categories',getCategories)
router.get('/:id',getPlein);
router.post('/new',createFournisseur); // Appel CREE fournisseur dans la db










export default router