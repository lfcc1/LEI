// --------------------------------------- Evento -----------------------------------------
var express = require('express');
var router = express.Router();

var Evento = require('../controllers/evento')

// ---------- ROTA   : /api/eventos ....

// ------------------------------------------------------ GET --------------------------------------------

router.get('/', function(req, res){
    Evento.getEventos()
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


router.get('/:idEvento', function(req, res){
    Evento.getEvento(req.params.idEvento)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.get('/parceria/:idParceria', function(req, res){
    Evento.getEventosFromParceria(req.params.idParceria)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


// ------------------------------------------------------ POST --------------------------------------------

router.post('/', function(req, res){
    Evento.insertEvento(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

module.exports = router;