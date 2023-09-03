import PromiseFtp from 'promise-ftp';
import fastcsv from 'fast-csv';
import fs from 'fs';
import {FtpListFourn, ListFourn} from '../../models/modelListFourn.js'
import mongoose from 'mongoose';


export const importFileFtp = async (req, res) => {
  const { urlFtp, nomUtilis, pass, nameFile } = req.body;
    
      try {
        const ftp = new PromiseFtp();
        await ftp.connect({ host: urlFtp, user: nomUtilis, password: pass });
    
        const remoteReadStream = await ftp.get(nameFile);
        const localWriteStream = fs.createWriteStream('local.csv');
    
        remoteReadStream.pipe(localWriteStream);
    
        localWriteStream.on('close', async () => {
          await ftp.end();
    
          const csvData = [];
          fs.createReadStream('local.csv')
            .pipe(fastcsv.parse({ headers: true }))
            .on('data', row => { 
              csvData.push(row);
            })
            .on('end', () => {
              fs.unlinkSync('local.csv'); // Delete the local file
              //console.log(csvData); // Process the CSV data
              res.status(200).send(csvData);
            });
        });
    
  } catch (error) {
    console.error('FTP Error:', error);
    res.status(500).send("FTP Error.");
  }
};

export const newFourn = async(req,res)=>{  
  const {collectionName , fieldNames , categorie , urlFtp ,nomUtilis , pass , nameFile } = req. body
try {
  const fourn = {
        collectionName: collectionName,
        fieldNames: fieldNames,
        categorie: categorie,
        host: urlFtp,
        username: nomUtilis,
        password: pass,
        filName: nameFile
      }

      const listFournFtp = new FtpListFourn(fourn)
      await listFournFtp.save();
      console.log("le resume du fournisseur a ete cree avec succes :",);
      res.sendStatus(200);
} catch (error) {
  console.error(
    "Erreur lors de la sauvegarde du fournisseur dans la listeCollection :",
    error
  );
  res.status(500).send({
    message: "Erreur lors de la sauvegarde du fournisseur dans la listeCollection :",
  });
}};


export const refreshFournisseurFtp = async (req, res) => {
  try {
    const {data,collectionName} = req.body
    const maCollection = mongoose.connection.collection(collectionName);
    await maCollection.deleteMany({});
    const result = await maCollection.insertMany(data);
    await FtpListFourn.findOneAndUpdate(
      { collectionName:collectionName}, // Filtre pour trouver le document que vous souhaitez mettre à jour
      { $set: { timeMaj: new Date() } }, // Définit 'timeMaj' sur la date actuelle
      { new: true })
res.status(200).send(result)
  } catch (error) {
    console.error("Erreur lors de la resauvgarde du fournisseur avec nouveau fichier :", error);
    res.status(500).send({
      message: "Erreur lors de la resauvgarde du fournisseur avec nouveau fichier :",
    });
  }
};

export const getTimeMaj = async (req,res)  =>{

  const collectionName = req.params.collect;
  console.log(collectionName);
  try {
    const fourn = await ListFourn.findOne({collectionName:collectionName})
    res.status(200).send(fourn.timeMaj)
  } catch (error) {
    console.error("Erreur lors de la récupération de plein :", error);
    res.status(500).send({
      message:
        "Une erreur s'est produite lors de la récupération de plein",
    });
  }
};

export default { importFileFtp , newFourn , getTimeMaj };
