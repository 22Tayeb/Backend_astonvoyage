import express from 'express';
import mongoose from 'mongoose';
import bodyParser  from "body-parser";
import { RouterUser } from "./router/user.router.js";
import { RouterDest } from './router/destination.router.js';
import multer from 'multer';
import cors  from "cors";
import { config as dotenvConfig } from 'dotenv';
import helmet from 'helmet';
import { RouterBooking } from './router/booking-destination.router.js';
import  File from './models/file.model.js';


dotenvConfig({path: './config/.env'});

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
    crossOriginResourcePolicy: {policy:'cross-origin'}
  }),
);
app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers',"Origin, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next()
});



const fileFilter = (req, file, cb) => {
  // Accepter uniquement les fichiers .jpeg ou .png
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non supporté'), false);
  }
};

//config multer
const storage = multer.memoryStorage();
const upload = multer({ storage });


mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@astonvoyage.re5jhkv.mongodb.net/?retryWrites=true&w=majority&appName=AstonVoyage',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('Connexion réussie à MongoDB');
}).catch((err) => console.log("Failed to connect to MongoDB", err));


app.use(bodyParser.json());
// API USER
app.use('/api/user/', RouterUser.createUsr);
app.use('/api/user/', RouterUser.authenticateUser);

// API DESTINATION
app.get('/api/destination/download/:filename', async (req,res) => {
  try {
    const file = await File.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.set('Content-Type', file.contentType);
    res.send(file.data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving file', error });
  }
});

app.post('/api/destination/upload', upload.single('file'), async (req,res,) => {
  const { originalname, mimetype, buffer } = req.file;
  console.log(req.file.originalname)

  const newFile = new File({
    filename: originalname,
    contentType: mimetype,
    data: buffer,
  });

  try {
    await newFile.save();
    res.status(201).json({ message: 'File uploaded successfully', file: req.file.originalname });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
  return;
});



app.use('/api/destination/', RouterDest.createDestination);

app.use('/api/booking/', RouterBooking.myBooking);


app.get("/", (req,res) => {
    res.send('Bienvenue sur le backend de AstonVoyage');
});

// Acces serveur 
app.listen(process.env.PORT, () => {
  console.log( `Serveur démarré sur le port ${process.env.PORT} -> http:\\localhost:${process.env.PORT}` );
});