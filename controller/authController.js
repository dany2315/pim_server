import User from '../models/modelUser.js'
import bcrypt from 'bcrypt'

export const login = async(req,res) =>{
    const {identifiant,password} = req.body
try {
    const user = await User.findOne({identifiant})
    if (!user) {
        res.status(401).send({msg:"identifiant incorrect",status:"error"})
    }
    const ismatche = await user.comparePassword(password)
    if (!ismatche) {
        res.status(401).send({msg:"mot de passe incorrect",status:"error"})
    }
    res.status(200).send({msg:"Autentification reussi",status:"success"})
} catch (error) {
    res.status(500).send({msg:"erreur de connexion",status:"error"})
}
} 