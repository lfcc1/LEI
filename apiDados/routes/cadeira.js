// --------------------------------------- Cadeira -----------------------------------------
var express = require('express');
var router = express.Router();

var Cadeira = require('../controllers/cadeira')
var passport = require('passport')

// ---------- ROTA   : /api/cadeiras ....
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

 function verifyAcess2(){
  return  function(req, res, next) {
    var u = req.user.user
    var x = getPermissao("Admin",u)
    if(x){
      next()
  }
  else{
    x = getPermissao("Responsavel", u)
    var idAno
    if(req.query.idAno) idAno = req.query.idAno
    else if(req.body.idAno) idAno = req.body.idAno
    if(x && idAno == u.ano){
      next()
    }
    else{
      console.log("Não tem permissão")
      res.status(403).jsonp("Não tem permissão")
    }
  }
  }
}
   
// -------------------------------------------------------------- GET ---------------------------------------------------------------------

// Toda a informação relativa a uma cadeira
router.get('/:idCadeira', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Cadeira.getCadeira(req.params.idCadeira)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // Todos os estudantes de uma determinada cadeira
  router.get('/:idCadeira/estudantes', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Cadeira.getEstudantesFromCadeira(req.params.idCadeira)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // Todos os responsaveis de uma determinada cadeira
  router.get('/:idCadeira/responsaveis', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Cadeira.getResponsaveisFromCadeira(req.params.idCadeira)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // Todas as publicações de uma determinada cadeira
  router.get('/:idCadeira/publicacoes', passport.authenticate('jwt', {session: false}), function(req, res, next){
   Cadeira.getPublicacoesFromCadeira(req.params.idCadeira)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
 })

 router.get('/:idCadeira/ficheiros', passport.authenticate('jwt', {session: false}), function(req, res, next){
   Cadeira.getFicheirosFromCadeira(req.params.idCadeira)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
 })

  // Todos os responsaveis de uma determinada cadeira
  router.get('/:idCadeira/pastas', passport.authenticate('jwt', {session: false}), function(req, res, next){
   Cadeira.getPastasFromCadeira(req.params.idCadeira)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
 })

   // Todos os responsaveis de uma determinada cadeira
   router.get('/pastas/:idPasta/ficheiros', passport.authenticate('jwt', {session: false}), function(req, res, next){
      Cadeira.getFicheirosFromPasta(req.params.idPasta)
         .then(dados => res.jsonp(dados))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
    })
   

 // -------------------------------------------------------------- POST ---------------------------------------------------------------------

 router.post('/', passport.authenticate('jwt', {session: false}), verifyAcess2(), function(req, res, next){
   
   Cadeira.insertCadeira(req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
 })

 router.post('/pastas', passport.authenticate('jwt', {session: false}), verifyAcess2(), function(req, res, next){
   
   Cadeira.insertPasta(req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
 })



 //--------------------------------------------------------------- PUT ------------------------------------------------------------------------


 router.put('/:id', passport.authenticate('jwt', {session: false}), verifyAcess2(), function(req, res, next){
   
   Cadeira.editarCadeira(req.params.id,req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
 })

 // -------------------------------------------------------------- DELETE ---------------------------------------------------------------------


 
 router.delete('/:idCadeira', passport.authenticate('jwt', {session: false}), verifyAcess2(), function(req, res, next){
   Cadeira.deleteCadeira(req.params.idCadeira)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
 })

 router.delete('/pastas/:id', passport.authenticate('jwt', {session: false}), verifyAcess2(), function(req, res, next){
   Cadeira.deletePasta(req.params.id)
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
 })

 
  module.exports = router;