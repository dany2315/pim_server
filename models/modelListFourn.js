import mongoose from "mongoose";


    const listShema = new mongoose.Schema({
          collectionName: String,
          fieldNames: [String],
          categorie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categori' }],
        },
      );

    
      const FtpListFournSchema = new mongoose.Schema({
        // Propriétés spécifiques à la catégorie 'ftp'
        host:{
          type:String,
          required:true,
        },
        username: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        filName:{
          type:String,
          required:true,
        }
      });
      
      // Schéma spécifique pour la catégorie 'url'
      const UrlListFournSchema = new mongoose.Schema({
        // Propriétés spécifiques à la catégorie 'url'
        url: {
          type: String,
          required: true,
        },
      });
      
      // Modèle de fournisseur
      const ListFourn = mongoose.model('listeCollection',listShema)
      // Modèle de fournisseur pour la catégorie 'ftp'
      const FtpListFourn = ListFourn.discriminator('ftp', FtpListFournSchema);
      // Modèle de fournisseur pour la catégorie 'url'
      const UrlListFourn = ListFourn.discriminator('url', UrlListFournSchema);
      
      

export {ListFourn ,FtpListFourn , UrlListFourn }
