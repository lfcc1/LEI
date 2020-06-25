// ------------------------------------------------------------ Cursos -------------------------------------------------------------------
var express = require('express');
var router = express.Router();

var passport = require('passport')
var host = require('../config/config').host
var apiCurso = host+"cursos/"
var axios = require('axios')

// ---------- ROTA   : /api/cursos ....

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

// Todos os cursos disponiveis
router.get('/', function(req, res, next) {
  axios.get(apiCurso)
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  // Toda a informação de um curso
  router.get('/:idCurso', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    axios.get(apiCurso + req.params.idCurso)
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  // Todos os estudantes que frequentam um determinado curso
  router.get('/:idCurso/estudantes', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    axios.get(apiCurso + req.params.idCurso + "/estudantes")
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  // Todos os anos que pertencam a um determinado curso
  router.get('/:idCurso/anos', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    axios.get(apiCurso + req.params.idCurso + "/anos")
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  // Todos os responsaveis de um determinado curso
  router.get('/:idCurso/responsaveis', passport.authenticate('jwt', {session: false}), function(req, res, next){
    axios.get(apiCurso + req.params.idCurso + "/responsaveis")
        .then(dados => res.jsonp(dados.data))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

  // Todas as publicações de um determinado curso
  router.get('/:idCurso/publicacoes', passport.authenticate('jwt', {session: false}), function(req, res, next){
    axios.get(apiCurso + req.params.idCurso + "/publicacoes")
        .then(dados => res.jsonp(dados.data))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

// -------------------------------------------------------------- POST ---------------------------------------------------------------------

  router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next){
    axios.post(apiCurso, req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })


  router.put('/:idCurso', passport.authenticate('jwt', {session: false}), function(req, res, next){
    axios.put(apiCurso + req.params.idCurso, req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

// -------------------------------------------------------------- DELETE ---------------------------------------------------------------------


router.delete('/:idCurso', passport.authenticate('jwt', {session: false}), function(req, res, next){
  axios.delete(apiCurso + req.params.idCurso)
  .then(dados => res.jsonp(dados.data))
  .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


  module.exports = router;