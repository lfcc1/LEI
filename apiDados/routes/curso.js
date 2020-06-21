// ------------------------------------------------------------ Cursos -------------------------------------------------------------------
var express = require('express');
var router = express.Router();

var Curso = require('../controllers/curso')

// ---------- ROTA   : /api/cursos ....

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
  
  // Todos os responsaveis de um determinado curso
  router.get('/:idCurso/responsaveis', function(req, res, next){
    Curso.getResponsaveisFromCurso(req.params.idCurso)
        .then(dados => res.jsonp(dados))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

  // Todas as publicações de um determinado curso
  router.get('/:idCurso/publicacoes', function(req, res, next){
    Curso.getPublicacoesFromCurso(req.params.idCurso)
        .then(dados => res.jsonp(dados))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

// -------------------------------------------------------------- POST ---------------------------------------------------------------------

  router.post('/', function(req, res, next){
    Curso.insertCurso(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })


  router.put('/:idCurso', function(req, res, next){
    Curso.editarCurso(req.params.idCurso, req.body.designacao)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

// -------------------------------------------------------------- DELETE ---------------------------------------------------------------------


router.delete('/:idCurso', function(req, res, next){
  Curso.deleteCurso(req.params.idCurso)
  .then(dados => res.jsonp(dados))
  .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


  module.exports = router;