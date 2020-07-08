// ------------------------------------------------------------ Anos -------------------------------------------------------------------------
var express = require('express');
var router = express.Router();
var host = require('../config/config').host

var apiAnos = host+"anos/"
var axios = require('axios')
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

// ---------- ROTA   : /api/anos ....

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

// Toda a informação relativa a um ano
router.get('/:idAno', passport.authenticate('jwt', {session: false}), function(req, res, next){
    axios.get(apiAnos + req.params.idAno + "?token=" + req.query.token)
        .then(dados => res.jsonp(dados.data))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // A informação relativa a um ano
  router.get('/:idAno/info', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    axios.get(apiAnos + req.params.idAno + "/info"+ "?token=" + req.query.token)
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  //Todos os responsaveis que gerem o ano
  router.get('/:idAno/responsaveis', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    axios.get(apiAnos + req.params.idAno + "/responsaveis"+ "?token=" + req.query.token)
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  
  // Todos os estudantes que frequentam um determinado ano
  router.get('/:idAno/estudantes', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    axios.get(apiAnos + req.params.idAno + "/estudantes"+ "?token=" + req.query.token)
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  // Todas as cadeiras lecionadas num determinado ano
  router.get('/:idAno/cadeiras', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    axios.get(apiAnos + req.params.idAno + "/cadeiras"+ "?token=" + req.query.token)
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });

  // Todas as cadeiras de um determinado ano
  router.get('/:idAno/publicacoes', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    axios.get(apiAnos + req.params.idAno + "/publicacoes"+ "?token=" + req.query.token)
         .then(dados => res.jsonp(dados.data))
         .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  });
  
  
// -------------------------------------------------------------- POST ---------------------------------------------------------------------

  router.post('/', passport.authenticate('jwt', {session: false}), verifyAcess("Admin"), function(req, res){
    axios.post(apiAnos + "?token=" + req.query.token, req.body)
       .then(dados => res.jsonp(dados.data))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })

  })



// -------------------------------------------------------------- PUT ---------------------------------------------------------------------


router.put('/:idAno', passport.authenticate('jwt', {session: false}), verifyAcess("Admin"),function(req, res){
  axios.put(apiAnos + req.params.idAno + "?token=" + req.query.token, req.body)
     .then(dados => {res.jsonp(dados.data)})
     .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})


// -------------------------------------------------------------- DELETE ---------------------------------------------------------------------

router.delete('/:idAno', passport.authenticate('jwt', {session: false}), verifyAcess("Admin"),function(req, res){
  axios.delete(apiAnos + req.params.idAno+ "?token=" + req.query.token)
       .then(dados => res.jsonp(dados.data))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
})

  module.exports = router;