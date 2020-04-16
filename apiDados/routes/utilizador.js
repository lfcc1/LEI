// ---------------------------------------- Utilizador ------------------------
var express = require('express');
var router = express.Router();

var Utilizador = require('../controllers/utilizador')

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

router.get('/:id', function(req, res, next){
    Utilizador.getUtilizadorAtomica(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  

  module.exports = router;