// --------------------------------------- Cadeira -----------------------------------------
var express = require('express');
var router = express.Router();

var apiCadeiras = "http://localhost:3050/api/cadeiras/"
var axios = require('axios')

// ---------- ROTA   : /api/cadeiras ....

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

// Toda a informação relativa a uma cadeira
router.get('/:idCadeira', function(req, res, next){
   axios.get(apiCadeiras + req.params.idCadeira)
       .then(dados => res.jsonp(dados.data))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // Todos os estudantes de uma determinada cadeira
  router.get('/:idCadeira/estudantes', function(req, res, next){
   axios.get(apiCadeiras + req.params.idCadeira + "/estudantes")
       .then(dados => res.jsonp(dados.data))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // Todos os responsaveis de uma determinada cadeira
  router.get('/:idCadeira/responsaveis', function(req, res, next){
   axios.get(apiCadeiras + req.params.idCadeira + "/responsaveis")
       .then(dados => res.jsonp(dados.data))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // Todas as publicações de uma determinada cadeira
  router.get('/:idCadeira/publicacoes', function(req, res, next){
   axios.get(apiCadeiras + req.params.idCadeira + "/publicacoes")
      .then(dados => res.jsonp(dados.data))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
 })

 // -------------------------------------------------------------- POST ---------------------------------------------------------------------

 router.post('/', function(req, res, next){
   axios.post(apiCadeiras, req.body)
      .then(dados => res.jsonp(dados.data))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
 })

 // -------------------------------------------------------------- DELETE ---------------------------------------------------------------------

 router.delete('/:idCadeira', function(req, res, next){
   axios.delete(apiCadeiras + req.params.idCadeira)
      .then(dados => res.jsonp(dados.data))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
 })

  module.exports = router;