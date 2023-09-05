import mongoose from "mongoose";
import {ListFourn} from "../../models/modelListFourn.js";


export   const createListFournFile = async (req, res) => {
    const { collectionName, fieldNames ,categorie} = req.body;
    try {
      const fourn = {
        collectionName: collectionName,
        fieldNames: fieldNames,
        categorie: categorie
      };
      const listFourn = new ListFourn(fourn);
  
      await listFourn.save();
      console.log("le resume du fournisseur a ete cree avec succes :", fourn);
      res.sendStatus(200);
    } catch (error) {
      console.error(
        "Erreur lors de la sauvegarde du fournisseur dans la listeCollection :",
        error
      );
      res.status(500).send({
        message: "Erreur lors de la sauvegarde du fournisseur dans la listeCollection :",
      });
    }
  };
  export const deleteContenuFile = async (req, res) => {
    try {
      const {collectionName} = req.body
      const maCollection = mongoose.connection.collection(collectionName);
      const result = await maCollection.deleteMany({});
      console.log("result delete :",result);
  res.status(200).send(result)
    } catch (error) {
      console.error("Erreur lors de la resauvgarde du fournisseur avec nouveau fichier :", error);
      res.status(500).send({
        message: "Erreur lors de la resauvgarde du fournisseur avec nouveau fichier :",
      });
    }
  };
  export const reSaveFournisseurFile = async (req, res) => {
    try {
      const {data,collectionName} = req.body
      const maCollection = mongoose.connection.collection(collectionName);
      const result = await maCollection.insertMany(data);
      
    
      
  res.status(200).send(result)
    } catch (error) {
      console.error("Erreur lors de la resauvgarde du fournisseur avec nouveau fichier :", error);
      res.status(500).send({
        message: "Erreur lors de la resauvgarde du fournisseur avec nouveau fichier :",
      });
    }
  };

  export default {createListFournFile, deleteContenuFile , reSaveFournisseurFile}
  