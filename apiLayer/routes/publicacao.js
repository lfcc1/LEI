// --------------------------------------- Conversa -----------------------------------------
var express = require('express');
var router = express.Router();

var apiPublicacoes = "http://localhost:3050/api/publicacoes/"
var axios = require('axios')

// ---------- ROTA   : /api/publicacoes ....

// ------------------------------------------------------ GET --------------------------------------------

router.get('/:idPublicacao', function(req, res){
    axios.get(apiPublicacoes + req.params.idPublicacao)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


router.get('/:idPublicacao/comentarios', function(req, res){
    axios.get(apiPublicacoes + req.params.idPublicacao + "/comentarios")
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


// ------------------------------------------------------ POST --------------------------------------------

router.post('/', function(req, res){
    axios.post(apiPublicacoes , req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.post('/:idPublicacao/comentario', function(req, res){
    axios.post(apiPublicacoes + req.params.idPublicacao + "/comentario", req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

// ------------------------------------------------------ PUT --------------------------------------------

router.put('/:idPublicacao', function(req, res){
    axios.put(apiPublicacoes + req.params.idPublicacao, req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.put('/:idPublicacao/gosto', function(req, res){
    axios.put(apiPublicacoes + req.params.idPublicacao + "/gosto")
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.put('/:idPublicacao/desgosto', function(req, res){
    axios.put(apiPublicacoes + req.params.idPublicacao + "/desgosto")
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


// ------------------------------------------------------ DELETE --------------------------------------------

router.delete('/:idPublicacao', function(req, res){
    axios.delete(apiPublicacoes + req.params.idPublicacao)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.delete('/comentario/:idComentario', function(req, res){
    axios.delete(apiPublicacoes + "comentario/" + req.params.idComentario)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})



module.exports = router;