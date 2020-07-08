// ------------------------------------------------------------ Cursos -------------------------------------------------------------------
var express = require('express');
var router = express.Router();

var Curso = require('../controllers/curso')
var passport = require('passport')



function getPermissao(acess,utilizador){
  var result= false
  utilizador.tipos.forEach(element => {
    if(element.classe == acess)
      result = true
  })
  return result;
}

function verifyAcess(acess){
  return  function(req, res, next) {
    var u = req.user.user
    var x = getPermissao(acess,u)
    if(x){
      next()
  }
  else{
    console.log("Não tem permissão")
    res.status(403).jsonp("Não tem permissão")
  }
  }
}
// ---------- ROTA   : /api/cursos ....

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

// Todos os cursos disponiveis
router.get('/', function(req, res, next) {
    Curso.getCursos()
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  // Toda a informação de um curso
  router.get('/:idCurso', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Curso.getCurso(req.params.idCurso)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  // Todos os estudantes que frequentam um determinado curso
  router.get('/:idCurso/estudantes', passport.authenticate('jwt', {session: false}), function(req, res, next) {
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
  router.get('/:idCurso/responsaveis', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Curso.getResponsaveisFromCurso(req.params.idCurso)
        .then(dados => res.jsonp(dados))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

  // Todas as publicações de um determinado curso
  router.get('/:idCurso/publicacoes', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Curso.getPublicacoesFromCurso(req.params.idCurso)
        .then(dados => res.jsonp(dados))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

// -------------------------------------------------------------- POST ---------------------------------------------------------------------

  router.post('/', passport.authenticate('jwt', {session: false}),  verifyAcess("Admin"), function(req, res, next){
    Curso.insertCurso(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })


  router.put('/:idCurso', passport.authenticate('jwt', {session: false}),  verifyAcess("Admin"), function(req, res, next){
    Curso.editarCurso(req.params.idCurso, req.body.designacao)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })

// -------------------------------------------------------------- DELETE ---------------------------------------------------------------------


router.delete('/:idCurso', passport.authenticate('jwt', {session: false}),  verifyAcess("Admin"), function(req, res, next){
  Curso.deleteCurso(req.params.idCurso)
  .then(dados => res.jsonp(dados))
  .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


  module.exports = router;