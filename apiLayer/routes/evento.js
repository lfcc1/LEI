// --------------------------------------- Evento -----------------------------------------
var express = require('express');
var router = express.Router();

var host = require('../config/config').host
var apiEventos = host+"eventos/"
var axios = require('axios')

// ---------- ROTA   : /api/eventos ....

// ------------------------------------------------------ GET --------------------------------------------

router.get('/', function(req, res){
    axios.get(apiEventos)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})



router.get('/:idEvento', function(req, res){
    axios.get(apiEventos + req.params.idEvento)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.get('/parceria/:idParceria', function(req, res){
    axios.get(apiEventos + "parceria/" + req.params.idParceria)
    .then(dados => res.jsonp(dados.data) )
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.get('/participante/:idParticipante', function(req, res){
    axios.get(apiEventos + "participante/" + req.params.idParticipante)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

// ------------------------------------------------------ POST --------------------------------------------

router.post('/', function(req, res){
    axios.post(apiEventos, req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

module.exports = router;