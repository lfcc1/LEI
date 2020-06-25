// --------------------------------------- Conversa -----------------------------------------
var express = require('express');
var axios = require('axios');
var passport = require('passport')
var router = express.Router();
var apiChat = require('../config/config').hostChat


/*
var passport = require('passport')


function checkPermissao(acess){
  return function(req, res, next) {
  if(acess == 0 || req.user.nAcess>=acess){
    console.log("Tem permissão")
    next()
  }
  else{
  console.log("Não tem permissão")
  res.status(401).jsonp("Não tem permissão")
  }
  }
}*/

//GET

router.get('/conversas', passport.authenticate('jwt', {session: false}), function(req,res){
  axios.get(apiChat + "conversas")
          .then(dados => res.jsonp(dados.data))
          .catch(erro => res.status(500).jsonp(erro))
})

router.get('/conversas/participante/:id', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.get(apiChat + "conversas/participante/" + req.params.id)
          .then(dados => res.jsonp(dados.data))
          .catch(erro => res.status(500).jsonp(erro))
})

router.get('/conversas/participante/:id/simples', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.get(apiChat + "conversas/participante/" + req.params.id + "/simples")
    .then(dados => res.jsonp(dados.data))
    .catch(erro => res.status(500).jsonp(erro))
})

//                                                  PUT

router.put('/conversas/:id', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.put(apiChat + "conversas/" + req.params.id, req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => res.status(500).jsonp(erro))
})

//                                                  POST

router.post('/conversas', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.post(apiChat + "conversas", req.body)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => res.status(500).jsonp(erro))
})

router.post('/conversas/:conversa/:participante', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.post(apiChat + "conversas/" + req.params.conversa + "/" + req.params.participante)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => res.status(500).jsonp(erro))
})


//                                                    DELETE

router.delete('/conversas/:conversa/:participante', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.delete(apiChat + "conversas/" + req.params.conversa + "/" + req.params.participante)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => res.status(500).jsonp(erro))
})


/////////////////////// Mensagens /////////////////////////////


router.get('/mensagens', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.get(apiChat + "mensagens")
    .then(dados => res.jsonp(dados.data))
    .catch(erro => res.status(500).jsonp(erro))
})

router.get('/mensagens/:conversa', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.get(apiChat + "mensagens/" + req.params.conversa)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => res.status(500).jsonp(erro))
})

router.post('/mensagens', passport.authenticate('jwt', {session: false}), function(req, res){
    axios.post(apiChat + "mensagens/", req.body)
            .then( () => res.jsonp({Result:"Message inserted"}))
            .catch(erro => res.status(500).jsonp(erro))
})



module.exports = router;
