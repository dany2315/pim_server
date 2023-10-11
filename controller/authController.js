import User from "../models/modelUser.js";
import jwt from 'jsonwebtoken'

const privateKey = process.env.PRIVATE_KEY



export const login = async (req, res) => {
  const { identifiant, password } = req.body;

  try {
    const newUser = await User.findOne({ identifiant });
    if (!newUser) {
      throw new Error("identifiant incorrect");
      // res.send({msg:"identifiant incorrect",status:"error"})
    }
    const ismatche = await newUser.comparePassword(password);
    if (!ismatche) {
      throw new Error("mot de passe incorrect");
      //res.send({msg:"mot de passe incorrect",status:"error"})
    }

    const expirationTime = Math.floor(Date.now() / 1000) + 6 * 60 * 60;
    const token = jwt.sign({ userID: newUser.id ,expirationTime}, privateKey, { algorithm: 'RS256' });

    res.status(200).send({ token,message: "Autentification reussi" });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};



export const register = async (req, res) => {
  const { firstName, lastName, identifiant, password } = req.body;
try {
  
const previdentifiant = await User.findOne({ identifiant });
console.log(previdentifiant);
  if (previdentifiant) {
    throw new Error("Identifiant existant");
  }
      const newUser = new User({
        role: 2,
        firstName: firstName,
        lastName: lastName,
        identifiant: identifiant,
        password: password, 
      }); 
      const expirationTime = Math.floor(Date.now() / 1000) + 6 * 60 * 60;
      const token = jwt.sign({ userID: newUser.id ,expirationTime}, privateKey, { algorithm: 'RS256' });
 
      await newUser.save()
        res.status(200).send({token,message:"Utilisateur enregistré"})
        console.log('Utilisateur enregistré :', newUser);

} catch (error) {
  res.status(500).send({message:error.message })
}} 

export const verifToken = async(req,res) =>{

  
}
 