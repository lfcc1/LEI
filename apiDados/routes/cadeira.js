// --------------------------------------- Cadeira -----------------------------------------
var express = require('express');
var router = express.Router();

var Cadeira = require('../controllers/cadeira')

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

router.get('/:idCadeira', function(req, res, next){
    Cadeira.getCadeira(req.params.idCadeira)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  router.get('/:idCadeira/estudantes', function(req, res, next){
    Cadeira.getEstudantesFromCadeira(req.params.idCadeira)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  router.get('/:idCadeira/responsaveis', function(req, res, next){
    Cadeira.getResponsaveisFromCadeira(req.params.idCadeira)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  module.exports = router;