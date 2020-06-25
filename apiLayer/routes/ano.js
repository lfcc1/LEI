// ------------------------------------------------------------ Anos -------------------------------------------------------------------------
var express = require('express');
var router = express.Router();
var host = require('../config/config').host

var apiAnos = host+"anos/"
var axios = require('axios')
var passport = require('passport')

// ---------- ROTA   : /api/anos ....

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

// Toda a informação relativa a um ano
router.get('/:idAno', passport.authenticate('jwt', {session: false}), function(req, res, next){
    axios.get(apiAnos + req.params.idAno)
        .then(dados => res.jsonp(dados.data))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // A informação relativa a um ano
  router.get('/:idAno/info', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    axios.get(apiAnos + req.params.idAno + "/info")
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  //Todos os responsaveis que gerem o ano
  router.get('/:idAno/responsaveis', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    axios.get(apiAnos + req.params.idAno + "/responsaveis")
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  
  // Todos os estudantes que frequentam um determinado ano
  router.get('/:idAno/estudantes', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    axios.get(apiAnos + req.params.idAno + "/estudantes")
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  // Todas as cadeiras lecionadas num determinado ano
  router.get('/:idAno/cadeiras', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    axios.get(apiAnos + req.params.idAno + "/cadeiras")
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });

  // Todas as cadeiras de um determinado ano
  router.get('/:idAno/publicacoes', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    axios.get(apiAnos + req.params.idAno + "/publicacoes")
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  
// -------------------------------------------------------------- POST ---------------------------------------------------------------------

  router.post('/', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.post(apiAnos, req.body)
       .then(dados => res.jsonp(dados.data))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })

  })



// -------------------------------------------------------------- PUT ---------------------------------------------------------------------


router.put('/:idAno', passport.authenticate('jwt', {session: false}), function(req, res){
  axios.put(apiAnos + req.params.idAno, req.body)
     .then(dados => {res.jsonp(dados.data)})
     .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


// -------------------------------------------------------------- DELETE ---------------------------------------------------------------------

router.delete('/:idAno', passport.authenticate('jwt', {session: false}), function(req, res){
  axios.delete(apiAnos + req.params.idAno)
       .then(dados => res.jsonp(dados.data))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

  module.exports = router;