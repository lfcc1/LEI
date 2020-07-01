// --------------------------------------- Conversa -----------------------------------------
var express = require('express');
var router = express.Router();

var Conversa = require('../controllers/conversa')
var passport = require('passport')

// ---------- ROTA   : /api/conversas ....

// ------------------------------------------------------ GET --------------------------------------------

router.get('/:idConversa', passport.authenticate('jwt', {session: false}), function(req, res, next){
    console.log('pirocas1')
    Conversa.getConversa(req.params.idConversa)
            .then(dados =>{ res.jsonp(dados) })
            .catch(erro => res.status(500).jsonp(erro) )
})


router.get('/participante/:idParticipante', passport.authenticate('jwt', {session: false}), function(req, res){
    Conversa.getConversasFromParticipante(req.params.idParticipante)
            .then(dados =>{ res.jsonp(dados) })
            .catch(erro => res.status(500).jsonp(erro) )
            
})

// ------------------------------------------------------ POST --------------------------------------------

router.post('/', passport.authenticate('jwt', {session: false}), function(req, res){
    Conversa.insertConversa(req.body)
            .then(dados =>{ res.jsonp(dados) })
            .catch(erro => res.status(500).jsonp(erro) )
            
})

router.post('/:idConversa/mensagem', passport.authenticate('jwt', {session: false}),  function(req, res){
    Conversa.insertMensagem(req.params.idConversa, req.body)
            .then(dados =>{ res.jsonp(dados) })
            .catch(erro => res.status(500).jsonp(erro) )
            
})

module.exports = router;