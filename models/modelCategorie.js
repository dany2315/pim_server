import mongoose from "mongoose";


const categorieSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required:true,
    },
    radius: {
      type: String,
      required:true,
    }
  });

  const Categorie = mongoose.model('Categorie', categorieSchema);

export default Categorie