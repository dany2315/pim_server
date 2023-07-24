import mongoose from "mongoose";
import createDynamicModel from "../models/modelFournisseur.js";
import {ListFourn} from "../models/modelListFourn.js";
import Categorie from '../models/modelCategorie.js'


export const getPlein = async (req,res)  =>{

  const collectionName = req.params.id;
  console.log(collectionName);
  try {
    const maCollection = mongoose.connection.collection(collectionName);
    const objet = await maCollection.findOne({})
  
    if (objet) {
      res.status(200).send(true)
    }else{
      res.status(200).send(false)
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération de plein :", error);
    res.status(500).send({
      message:
        "Une erreur s'est produite lors de la récupération de plein",
    });
  }
};
 
export const getFournisseurs = async (req, res) => {
  try {
    const fournisseurs = await ListFourn.find({ fieldNames: { $ne: [] } });
    if (fournisseurs) {
      res.status(200).send(fournisseurs);
    console.log("fourn",fournisseurs);
    }else{
      res.status(200).send("vide");
    }
  
    
  } catch (err) {
    console.error("Erreur lors de la récupération des fournisseurs :", err);
    res.status(500).send({
      message:
        "Une erreur s'est produite lors de la récupération des fournisseurs",
    });
  }
};



export const createFournisseur = async (req, res) => {
  const { collectionName, data } = req.body;

  //fonction pour cree le resume du fournisseur dans la collection listecollections
console.log("collectionName",collectionName);
  //recuperer les champs pour cree le fournisseur dans la Base de donne
  const keys = data.reduce((keys, obj) => {
    Object.keys(obj).forEach((key) => {
      if (!keys.includes(key)) {
        keys.push(key)
      }
    });
    return keys;
  }, []);

  // Ceci est le shema dynamicModel avec la fonction createDynamiqueModel pour avoir
  const Fournisseur = createDynamicModel(collectionName, keys);

  try {
    // Supprimer les anciennes données de la collection
    await Fournisseur.deleteMany();

    // Insérer les nouvelles données dans la collection
    await Fournisseur.create(data);  
    console.log("Données sauvegardées dans la collection :", collectionName);
    res.sendStatus(200);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de fournisseurs new :", error);
    res.status(500).send({
      message: "Erreur lors de la sauvegarde de fournisseurs new",
    });
  }
};

export const getCategories = async(req , res) => {
try {
  const categories = await Categorie.find({})
  res.status(200).send(categories)
} catch (error) {
  res.status(500).send(error)
}
}



export default { getFournisseurs ,getPlein ,createFournisseur , getCategories};
