// --------------------------------------- Conversa -----------------------------------------
var express = require('express');
var router = express.Router();

var host = require('../config/config').host
var apiPublicacoes = host+"publicacoes/"
var axios = require('axios')
var passport = require('passport')

// ---------- ROTA   : /api/publicacoes ....

// ------------------------------------------------------ GET --------------------------------------------

router.get('/search/:titulo', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.get(apiPublicacoes + "search/" + req.params.titulo)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


router.get('/:idPublicacao', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.get(apiPublicacoes + req.params.idPublicacao)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


router.get('/:idPublicacao/comentarios', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.get(apiPublicacoes + req.params.idPublicacao + "/comentarios")
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


// ------------------------------------------------------ POST --------------------------------------------

router.post('/', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.post(apiPublicacoes , req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.post('/:idPublicacao/comentario', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.post(apiPublicacoes + req.params.idPublicacao + "/comentario", req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

// ------------------------------------------------------ PUT --------------------------------------------

router.put('/:idPublicacao', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.put(apiPublicacoes + req.params.idPublicacao, req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.put('/:idPublicacao/gosto', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.put(apiPublicacoes + req.params.idPublicacao + "/gosto")
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.put('/:idPublicacao/desgosto', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.put(apiPublicacoes + req.params.idPublicacao + "/desgosto")
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


// ------------------------------------------------------ DELETE --------------------------------------------

router.delete('/:idPublicacao', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.delete(apiPublicacoes + req.params.idPublicacao)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.delete('/comentario/:idComentario', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.delete(apiPublicacoes + "comentario/" + req.params.idComentario)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})



module.exports = router;