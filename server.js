import express from "express";
import 'dotenv/config'
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import router from "./routes/index.js";
import bodyParser from 'body-parser'





//connection mongoDB localhost
const ENV = process.env.ENV
const URL_DATABASE = process.env.URL_DATABASE
const PORT = process.env.PORT 
const PRIVATE_KEY = process.env.PRIVATE_KEY

console.log(ENV);


const CONNECTION_URL = `${URL_DATABASE}`;

mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`connect to mongoDB: ${ENV}`))

  .catch((error) =>
    console.log("probleme de connexion a mongoDB " + error.message)
  );

//server express URL: http://localhost:5000/api
const app = express();

app.set('trust proxy', true);
//use body parser pour pouvoir augmenter la limite de transfere
app.use(bodyParser.json({ limit: '10mb' }));
//use cors
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});
app.use("/api", router);
app.use("/",(req,res)=>{
  console.log("welcome to the home page");
  res.send("welcome to the home page")
})

//middlware pour verif token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant. Authentifiez-vous.' });
  }
  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide.' });
    }
    console.log("connecte");
    req.user = decoded;
    next();
  });
}  

// Middleware d'exclusion pour les routes register et login
function excludeRoutes(req, res, next) {
  if (req.path === '/register' || req.path === '/login') {
    return next(); // Les routes register et login ne nécessitent pas de JWT
  }
  verifyToken(req, res, next); // Appliquer le middleware de vérification JWT pour toutes les autres routes
}

// Appliquer le middleware d'exclusion à toutes les routes
app.use(excludeRoutes);




app.listen(PORT, () => console.log(`Le serveur de ${ENV} tourne dans le port ${PORT}!`));
