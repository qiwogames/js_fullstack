const express = require('express');

//le middleware Auth + token
const {pagePrivee} = require('../middlewares/authMiddleware');
//le fonctions du controller
const userController = require('../controllers/usersController');

//le routeur express
const router = express.Router();

router.post('/inscription', userController.inscription);
router.post('/connexion', userController.connexion);
router.route('/profile').get(pagePrivee, userController.getUserProfile);

module.exports = router;