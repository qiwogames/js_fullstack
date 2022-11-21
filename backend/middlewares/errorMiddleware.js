//les erreurs

const notFound = (err, req, res, next) => {
    //ternaire soit ok = status 200 ou erreur serveur 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    //on retourne le status bool
    res.status(statusCode);
    //on affiche une erreur au format json
    res.json({
        message: err.message
    });
}

//analyse de l'erreur
const errorHandler = (req, res, next) => {
    const erreur = new Error(`Element non trouvé ! ${req.originalUrl}`);
    res.status(404);
    next(erreur);
}

module.exports = {notFound, errorHandler}