// --------------------------------------- Conversa -----------------------------------------
var express = require('express');
var router = express.Router();

var Publicacao = require('../controllers/publicacao')

// ---------- ROTA   : /api/publicacoes ....

// ------------------------------------------------------ GET --------------------------------------------

router.get('/:idPublicacao', function(req, res){
    Publicacao.getPublicacao(req.params.idPublicacao)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


router.get('/:idPublicacao/comentarios', function(req, res){
    Publicacao.getComentariosFromPublicacao(req.params.idPublicacao)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


// ------------------------------------------------------ POST --------------------------------------------

router.post('/', function(req, res){
    Publicacao.insertPublicacao(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.post('/:idPublicacao/comentario', function(req, res){
    Publicacao.insertComentario(req.params.idPublicacao, req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

module.exports = router;