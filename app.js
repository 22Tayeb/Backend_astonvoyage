import express from 'express';
import mongoose from 'mongoose';
import bodyParser  from "body-parser";
import { RouterUser } from "./router/user.router.js";
import { RouterDest } from './router/destination.router.js';
import multer from 'multer';
import cors  from "cors";
import { config as dotenvConfig } from 'dotenv';
import path,{dirname} from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet'
import { RouterBooking } from './router/booking-destination.router.js';

dotenvConfig({path: './config/.env'})


const app = express();
// Cors options 
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
    
}

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "defaultSrc": ["http://localhost:4200"],
        "imgSrc": ["http://localhost:4200"],
      },
      
    },
    crossOriginResourcePolicy: {policy:'same-site'}
  }),
);
app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers',"Origin, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   // res.header('Content-Security-Policy', "default-src 'self'")
    next()
});

const __filename = fileURLToPath(import.meta.url);
const __dirname =path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
//config multer





//conection to my BDD
mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@astonvoyage.re5jhkv.mongodb.net/?retryWrites=true&w=majority&appName=AstonVoyage',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    console.log('Connexion réussi à MangoDB');
}).catch((err) => console.log("failed to connect to MangoDB" ,err));

app.use(bodyParser.json());
// API USER
app.use('/api/user/', RouterUser.createUsr);
//app.use('/api/user/', RouterUser.authenticateUser);

// API DESTINATION
app.get('/api/destination/download/:filename', (req,res) => {
    const fileName = req.params.filename;
        const __dirname = dirname(fileURLToPath(import.meta.url));

    const filePath = path.join(__dirname, 'uploads', fileName);


    //envoi du fichier en reponse
    res.download(filePath, fileName, (err) => {
        if(err) {
            //handle error
            console.error('Error downloading file:', err);
            res.status(500).send('error downloading file');
        }
    });
});
app.post('/api/destination/upload', upload.single('file'), (req,res,) => {
  // ... gérer le fichier reçu ici ...

  try {
  const filePath = `http://localhost:${process.env.PORT}/${req.file.originalname}`  
  res.status(200).send({url:filePath})
  } catch(e) {
    res.status(500).send('erreur' + e)
  }

});


app.use('/api/destination/', RouterDest.createDestination);
app.use('/api/booking/', RouterBooking.createBookingDest);

app.get("/", (req,res) => {
    res.send('Bienvenue sur le backend de AstonVoyage');
});

// Acces serveur 
app.listen(process.env.PORT, () => {
  console.log( `Serveur démarré sur le port ${process.env.PORT} -> http:\\localhost:${process.env.PORT}` );
});

