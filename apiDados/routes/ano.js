// ------------------------------------------------------------ Anos -------------------------------------------------------------------------
var express = require('express');
var router = express.Router();

var Ano = require('../controllers/ano')
var passport = require('passport')

// ---------- ROTA   : /api/anos ....


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
// -------------------------------------------------------------- GET ---------------------------------------------------------------------

// Toda a informação relativa a um ano
router.get('/:idAno', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Ano.getAno(req.params.idAno)
        .then(dados => res.jsonp(dados))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // A informação relativa a um ano
  router.get('/:idAno/info', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Ano.getAnoAtomica(req.params.idAno)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  //Todos os responsaveis que gerem o ano
  router.get('/:idAno/responsaveis', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Ano.getResponsaveisFromAno(req.params.idAno)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  
  // Todos os estudantes que frequentam um determinado ano
  router.get('/:idAno/estudantes', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Ano.getEstudantesFromAno(req.params.idAno)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  // Todas as cadeiras lecionadas num determinado ano
  router.get('/:idAno/cadeiras', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Ano.getCadeirasFromAno(req.params.idAno)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });

  // Todas as cadeiras de um determinado ano
  router.get('/:idAno/publicacoes', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Ano.getPublicacoesFromAno(req.params.idAno)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  
// -------------------------------------------------------------- POST ---------------------------------------------------------------------

  router.post('/', passport.authenticate('jwt', {session: false}), verifyAcess("Admin"), function(req, res){
    Ano.insertAno(req.body)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })

  })



// -------------------------------------------------------------- PUT ---------------------------------------------------------------------

  // AINDA NÃO ESTÃO A DAR

router.put('/:idAno', passport.authenticate('jwt', {session: false}), verifyAcess("Admin"), function(req, res){
  Ano.editarAno(req.params.idAno, req.body.designacao, req.body.anoLetivo)
     .then(dados => {res.jsonp(dados)})
     .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


router.put('/:idAno/responsavel/:idResponsavel', passport.authenticate('jwt', {session: false}), verifyAcess("Admin"), function(req, res){
    Ano.addResponsavelToAno(req.params.idAno, req.params.idResponsavel)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


router.put('/:idAno/estudante/:idEstudante', passport.authenticate('jwt', {session: false}), verifyAcess("Admin"), function(req, res){
    Ano.addEstudanteToAno(req.params.idAno, req.params.idResponsavel)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

// -------------------------------------------------------------- DELETE ---------------------------------------------------------------------

router.delete('/:idAno', passport.authenticate('jwt', {session: false}), verifyAcess("Admin"),function(req, res){
  Ano.deleteAno(req.params.idAno)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

  module.exports = router;