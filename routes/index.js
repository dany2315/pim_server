import express  from "express";
import produitRoutes from "./produitRoutes.js";
import fournisseurRoutes from "./fournisseurRoutes.js"
import authRoutes from './authRoutes.js'

const router = express.Router();

//http://localhost:5000/api

router.use('/produits',produitRoutes);
router.use('/fournisseur',fournisseurRoutes);
router.use('/auth',authRoutes);


export default router


