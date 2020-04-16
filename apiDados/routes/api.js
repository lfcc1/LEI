var express = require('express');
var router = express.Router();

var Curso = require('../controllers/curso')
var Ano = require('../controllers/ano')
var Cadeira = require('../controllers/cadeira')

var Utilizador = require('../controllers/utilizador')
var Ficheiro = require('../controllers/ficheiro')
// -------------------------------------------------------------- GET ---------------------------------------------------------------------

// ------------------------------------------------------------ Cursos -------------------------------------------------------------------

// Todos os cursos disponiveis
router.get('/cursos', function(req, res, next) {
  Curso.getCursos()
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
});

// Toda a informação de um curso
router.get('/cursos/:idCurso', function(req, res, next) {
  Curso.getCurso(req.params.idCurso)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
});

// Todos os estudantes que frequentam um determinado curso
router.get('/cursos/:idCurso/estudantes', function(req, res, next) {
  Curso.getEstudantesFromCurso(req.params.idCurso)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
});

// Todos os anos que pertencam a um determinado curso
router.get('/cursos/:idCurso/anos', function(req, res, next) {
  Curso.getAnosFromCurso(req.params.idCurso)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
});

router.get('/cursos/:idCurso/responsaveis', function(req, res, next){
  Curso.getResponsaveisFromCurso(req.params.idCurso)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

// ------------------------------------------------------------ Anos -------------------------------------------------------------------------

// Toda a informação relativa a um ano
router.get('/anos/:idAno', function(req, res, next){
  Ano.getAno(req.params.idAno)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

// A informação relativa a um ano
router.get('/anos/:idAno/info', function(req, res, next) {
  Ano.getAnoAtomica(req.params.idAno)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
});

//Todos os responsaveis que gerem o ano
router.get('/anos/:idAno/responsaveis', function(req, res, next) {
  Ano.getResponsaveisFromAno(req.params.idAno)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
});


// Todos os estudantes que frequentam um determinado ano
router.get('/anos/:idAno/estudantes', function(req, res, next) {
  Ano.getEstudantesFromAno(req.params.idAno)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
});

// Todas as cadeiras lecionadas num determinado ano
router.get('/anos/:idAno/cadeiras', function(req, res, next) {
  Ano.getCadeirasFromAno(req.params.idAno)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
});

// --------------------------------------- Cadeira -----------------------------------------
router.get('/cadeiras/:idCadeira', function(req, res, next){
  Cadeira.getCadeira(req.params.idCadeira)
     .then(dados => res.jsonp(dados))
     .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.get('/cadeiras/:idCadeira/estudantes', function(req, res, next){
  Cadeira.getEstudantesFromCadeira(req.params.idCadeira)
     .then(dados => res.jsonp(dados))
     .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.get('/cadeiras/:idCadeira/responsaveis', function(req, res, next){
  Cadeira.getResponsaveisFromCadeira(req.params.idCadeira)
     .then(dados => res.jsonp(dados))
     .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


// ---------------------------------------- Utilizador ------------------------

router.get('/utilizador/:id', function(req, res, next){
  Utilizador.getUtilizadorAtomica(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

// ---------------------------------------- Ficheiro ------------------------

router.get('/ficheiros', function(req, res, next){
  Ficheiro.getFicheiros()
    .then(dados => res.jsonp(dados))
    .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.get('/ficheiros/:idFicheiro', function(req, res, next){
  Ficheiro.getFicheiroAtomica(req.params.idFicheiro)
     .then(dados => res.jsonp(dados))
     .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

router.get('/ficheiros/:idFicheiro/download', function(req, res, next){
  Ficheiro.getFicheiroPath(req.params.idFicheiro)
    .then(dados => {
      res.download(dados[0].localizacao)
    })
    .catch(erro => res.status(500).jsonp(erro))
})

router.post('/ficheiros', function(req, res){
  //console.log(req.files)
  console.log(req)
  Ficheiro.insereFicheiro(req.body)
  .then(dados => res.jsonp(dados))
  .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })

})

module.exports = router;
