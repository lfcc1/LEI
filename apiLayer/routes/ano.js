// ------------------------------------------------------------ Anos -------------------------------------------------------------------------
var express = require('express');
var router = express.Router();
var host = require('../config/config').host

var apiAnos = host+"anos/"
var axios = require('axios')

// ---------- ROTA   : /api/anos ....

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

// Toda a informação relativa a um ano
router.get('/:idAno', function(req, res, next){
    axios.get(apiAnos + req.params.idAno)
        .then(dados => res.jsonp(dados.data))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // A informação relativa a um ano
  router.get('/:idAno/info', function(req, res, next) {
    axios.get(apiAnos + req.params.idAno + "/info")
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  //Todos os responsaveis que gerem o ano
  router.get('/:idAno/responsaveis', function(req, res, next) {
    axios.get(apiAnos + req.params.idAno + "/responsaveis")
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  
  // Todos os estudantes que frequentam um determinado ano
  router.get('/:idAno/estudantes', function(req, res, next) {
    axios.get(apiAnos + req.params.idAno + "/estudantes")
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  // Todas as cadeiras lecionadas num determinado ano
  router.get('/:idAno/cadeiras', function(req, res, next) {
    axios.get(apiAnos + req.params.idAno + "/cadeiras")
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });

  // Todas as cadeiras de um determinado ano
  router.get('/:idAno/publicacoes', function(req, res, next) {
    axios.get(apiAnos + req.params.idAno + "/publicacoes")
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  
// -------------------------------------------------------------- POST ---------------------------------------------------------------------

  router.post('/', function(req, res){
    axios.post(apiAnos, req.body)
       .then(dados => res.jsonp(dados.data))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })

  })



// -------------------------------------------------------------- PUT ---------------------------------------------------------------------


router.put('/:idAno', function(req, res){
  axios.put(apiAnos + req.params.idAno, req.body)
     .then(dados => {res.jsonp(dados.data)})
     .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


// -------------------------------------------------------------- DELETE ---------------------------------------------------------------------

router.delete('/:idAno', function(req, res){
  axios.delete(apiAnos + req.params.idAno)
       .then(dados => res.jsonp(dados.data))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

  module.exports = router;