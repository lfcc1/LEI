// ------------------------------------------------------------ Anos -------------------------------------------------------------------------
var express = require('express');
var router = express.Router();

var Ano = require('../controllers/ano')

// ---------- ROTA   : /api/anos ....

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

// Toda a informação relativa a um ano
router.get('/:idAno', function(req, res, next){
    Ano.getAno(req.params.idAno)
        .then(dados => res.jsonp(dados))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // A informação relativa a um ano
  router.get('/:idAno/info', function(req, res, next) {
    Ano.getAnoAtomica(req.params.idAno)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  //Todos os responsaveis que gerem o ano
  router.get('/:idAno/responsaveis', function(req, res, next) {
    Ano.getResponsaveisFromAno(req.params.idAno)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  
  // Todos os estudantes que frequentam um determinado ano
  router.get('/:idAno/estudantes', function(req, res, next) {
    Ano.getEstudantesFromAno(req.params.idAno)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  // Todas as cadeiras lecionadas num determinado ano
  router.get('/:idAno/cadeiras', function(req, res, next) {
    Ano.getCadeirasFromAno(req.params.idAno)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });

  // Todas as cadeiras de um determinado ano
  router.get('/:idAno/publicacoes', function(req, res, next) {
    Ano.getPublicacoesFromAno(req.params.idAno)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  
// -------------------------------------------------------------- POST ---------------------------------------------------------------------

  router.post('/', function(req, res){
    Ano.insertAno(req.body)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })

  })



// -------------------------------------------------------------- PUT ---------------------------------------------------------------------

  // AINDA NÃO ESTÃO A DAR

router.put('/:idAno', function(req, res){
  Ano.editarAno(req.params.idAno, req.body.designacao, req.body.anoLetivo)
     .then(dados => {res.jsonp(dados)})
     .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


router.put('/:idAno/responsavel/:idResponsavel', function(req, res){
    Ano.addResponsavelToAno(req.params.idAno, req.params.idResponsavel)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


router.put('/:idAno/estudante/:idEstudante', function(req, res){
    Ano.addEstudanteToAno(req.params.idAno, req.params.idResponsavel)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

// -------------------------------------------------------------- DELETE ---------------------------------------------------------------------

router.delete('/:idAno', function(req, res){
  Ano.deleteAno(req.params.idAno)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

  module.exports = router;