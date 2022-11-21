//Middleware simple pour gérer les exceptions à l'intérieur 
//des routes express asynchrones et les transmettre à vos gestionnaires d'erreurs express.
const asyncHandler = require('express-async-handler');
//le modele user
const User = require('../models/usersModel');
//la generation des tokens
const generateToken = require('../utils/generateToken');

//inscrire des utilisateurs
const inscription = asyncHandler(async (req, res) =>{
    //parser les données
    const {firstname, email, password} = req.body;
    //eviter les doublons
    //verifier que l'email n'existe pas deja
    const userExists = await User.findOne({email});
    //si il existe deja
    if(userExists){
        res.status(404);
        throw new Error('Cette email est indisponible !');
    }
    //Sinon on Creer un nouvel utilisateur
    const user = await User.create({firstname, email, password});
    //si ca marche on retourne l'objet user au format json
    if(user){
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            email: user.email
        })
    }else{
        res.status(400);
        throw new Error('Erreur lors de votre inscription !');
    } 
});

/****************************CONNEXION******************/
const connexion = asyncHandler(async (req,res) => {
    //parse des données
    const {email, password} = req.body;
    //check si email existe dans db -> collection
    const user = await User.findOne({email});
    //si user existe + compare password match => usersSchema.methods.matchPassword 
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            firstname: user.firstname,
            email: user.email,
            userToken: generateToken(user._id)
        })
    }else{
        res.status(401);
        throw new Error('Erreur de connexion : merci de verifié votre email et mot de passe !');
    }
});


//Si ca matche on redirige vers le profile de user
const getUserProfile = asyncHandler(async (req,res) => {
    //get du req.user du fichier authMiddleware.js
    const user = await User.findById(req.user._id);
    //Si user existe et match 
    if(user){
        res.json({
            id: user._id,
            firstname: user.firstname,
            email: user.email
        })
    }else{
        res.status(404);
        throw new Error('Utilisateur inconnu !')
    }
});

module.exports = {inscription, connexion, getUserProfile}