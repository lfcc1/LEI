// ------------------------------------------------------------ Cursos -------------------------------------------------------------------
var express = require('express');
var router = express.Router();

var Curso = require('../controllers/curso')

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

// Todos os cursos disponiveis
router.get('/', function(req, res, next) {
    Curso.getCursos()
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  // Toda a informação de um curso
  router.get('/:idCurso', function(req, res, next) {
    Curso.getCurso(req.params.idCurso)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  // Todos os estudantes que frequentam um determinado curso
  router.get('/:idCurso/estudantes', function(req, res, next) {
    Curso.getEstudantesFromCurso(req.params.idCurso)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  // Todos os anos que pertencam a um determinado curso
  router.get('/:idCurso/anos', function(req, res, next) {
    Curso.getAnosFromCurso(req.params.idCurso)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  router.get('/:idCurso/responsaveis', function(req, res, next){
    Curso.getResponsaveisFromCurso(req.params.idCurso)
        .then(dados => res.jsonp(dados))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

  module.exports = router;