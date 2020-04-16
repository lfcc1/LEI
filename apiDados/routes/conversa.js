// --------------------------------------- Conversa -----------------------------------------
var express = require('express');
var router = express.Router();

var Conversa = require('../controllers/conversa')

// ------------------------------------------------------ GET --------------------------------------------

router.get('/:idConversa', function(req, res, next){
    console.log('pirocas1')
    Conversa.getConversa(req.params.idConversa)
            .then(dados =>{ res.jsonp(dados) })
            .catch(erro => res.status(500).jsonp(erro) )
})


router.get('/participante/:idParticipante', function(req, res){
    Conversa.getConversasFromParticipante(req.params.idParticipante)
            .then(dados =>{ res.jsonp(dados) })
            .catch(erro => res.status(500).jsonp(erro) )
            
})




module.exports = router;