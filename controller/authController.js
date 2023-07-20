import User from '../models/modelUser.js'
import bcrypt from 'bcrypt'


export const login = async(req,res) =>{
    const {identifiant,password} = req.body
try {
    const user = await User.findOne({identifiant})
    if (!user) {
        throw new Error("identifiant incorrect");
       // res.send({msg:"identifiant incorrect",status:"error"})
    }
    const ismatche = await user.comparePassword(password)
    if (!ismatche) {
        throw new Error("mot de passe incorrect");
        //res.send({msg:"mot de passe incorrect",status:"error"})
    }
    res.status(200).send({message:"Autentification reussi"})
} catch (error) {
    res.status(401).send({message:error.message})
}
} 