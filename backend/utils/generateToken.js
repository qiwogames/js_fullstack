//module jwt
const jwt = require('jsonwebtoken');

//generer un token par users qui expire dans 12h
const generateToken = (id) => {
    return jwt.sign({id}, 'CLE_SECRETE', {expiresIn: '12h'});
}

//export de la fonction 
module.exports = generateToken;