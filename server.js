//module chemin nodejs
const path = require('path');
//micro framework express
const express = require('express');
//instance du framework
const app = express();
//variable d'environement
const dotenv = require('dotenv');
//import du fichier de connexion a mongodb
const mongoose = require('mongoose');
//Cors
const cors = require('cors');
//le port d'ecoute
const PORT = 5000;
//le router
const router = require('./backend/routes/routes');
//le gestionnaire d'erreur
const {errorHandler, notFound} = require('./backend/middlewares/errorMiddleware')

//connexion a mongodb
const mongoDBconnexion = mongoose.connect('mongodb://localhost:27017/micdatabase');
if(!mongoDBconnexion){
    throw new Error('Erreur de connexion a mongoDb');
    process.exit(1);
}else{
    console.log('Vous etes connectez a mongoDB !');
}


//bodyparser
app.use(express.json());
//Dossier de fichier statique
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
//USES
//les routes = request HTTP
app.use(router);
//les erreurs
app.use(notFound);
app.use(errorHandler);

//ecoute et demarage du seveur
app.listen(PORT, () => {
    console.log(`Le serveur a demarré sur l'adresse http://127.0.0.1:${PORT}`);
});

