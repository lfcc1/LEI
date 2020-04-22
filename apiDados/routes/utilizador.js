// ---------------------------------------- Utilizador ------------------------
var express = require('express');
var router = express.Router();

var Utilizador = require('../controllers/utilizador')

// ---------- ROTA   : /api/utilizadores ....

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

router.get('/:id', function(req, res, next){
    Utilizador.getUtilizadorAtomica(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  


// -------------------------------------------------------------- POST ---------------------------------------------------------------------

router.post('/', function(req, res, next){
  Utilizador.insertUtilizador(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


  module.exports = router;