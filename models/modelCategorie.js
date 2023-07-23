import mongoose from "mongoose";


const categorieSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    }
  });

  const Categorie = mongoose.model('Categorie', categorieSchema);

export default Categorie