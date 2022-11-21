//crypter les mot de passe
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

//le schema de la collection
const usersSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
},
    {
        timestamps: true
    }
);

//Avant l'enregistrement d'un utilisateur on hash le mot de passe avec pre()
usersSchema.pre('save', async function(){
    //le salt
    const salt = await bcrypt.genSalt(10);
    //le hash
    this.password = await bcrypt.hash(this.password, salt);
});

//Cette methodes check le mot de passe entrer le hash de la collection
usersSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//export du modele
const User = mongoose.model('users', usersSchema, 'users');

module.exports = User;