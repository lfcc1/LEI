// --------------------------------------- Conversa -----------------------------------------
var express = require('express');
var router = express.Router();

var Publicacao = require('../controllers/publicacao')

// ------------------------------------------------------ GET --------------------------------------------

router.get('/:idPublicacao', function(req, res){
    Publicacao.getPublicacao(req.params.idPublicacao)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})



module.exports = router;