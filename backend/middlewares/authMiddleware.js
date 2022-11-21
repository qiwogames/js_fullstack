//les tokens
const jwt = require('jsonwebtoken');
//Middleware simple pour gérer les exceptions à l'intérieur 
//des routes express asynchrones et les transmettre à vos gestionnaires d'erreurs express.
const asyncHandler = require('express-async-handler');
//le modele user
const User = require('../models/usersModel');

const pagePrivee = asyncHandler(async (req, res, next) =>{
    let token;
    //entete
    const authHeader = req.headers.authorization;
    //Si l'entete existe et commence par Bearer
    if(authHeader && authHeader.startsWith('Bearer')){
        try{
            //on extrait le token depuis authHeader
            token = authHeader.split(' ')[1];
            //verifié que le token retourne un id user
            const decoded = jwt.verify(token, 'CLE_SECRETE');
            //si ca match on assigne le token a id user
            req.user = await User.findById(decoded.id).select('-password');
            //on passe a l'execution de la route
            next();
        }catch(erreur){
            res.status(401);
            throw new Error('Jeton de connexion invalide !');
        }
    }

    //si le token n'existe pas
    if(!token){
        res.status(401);
            throw new Error('Jeton non trouvé !');
    }

});

module.exports = {pagePrivee}