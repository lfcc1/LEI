// --------------------------------------- Conversa -----------------------------------------
var express = require('express');
var router = express.Router();

var Publicacao = require('../controllers/publicacao')

// ---------- ROTA   : /api/publicacoes ....

// ------------------------------------------------------ GET --------------------------------------------

router.get('/search/:titulo', function(req, res){
    Publicacao.findPublicacaoByTitulo(req.params.titulo)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


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

// ------------------------------------------------------ PUT --------------------------------------------

router.put('/:idPublicacao', function(req, res){
    Publicacao.updatePublicacao(req.params.idPublicacao, req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.put('/:idPublicacao/gosto', function(req, res){
    Publicacao.adicionaLike(req.params.idPublicacao, req.body.idUtilizador)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.put('/:idPublicacao/desgosto', function(req, res){
    Publicacao.removeLike(req.params.idPublicacao, req.body.idUtilizador)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


// ------------------------------------------------------ DELETE --------------------------------------------

router.delete('/:idPublicacao', function(req, res){
    Publicacao.deletePublicacao(req.params.idPublicacao)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.delete('/comentario/:idComentario', function(req, res){
    Publicacao.deleteComentario(req.params.idComentario)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})



module.exports = router;