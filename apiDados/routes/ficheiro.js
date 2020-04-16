// ---------------------------------------- Ficheiro ------------------------
var express = require('express');
var router = express.Router();

var Ficheiro = require('../controllers/ficheiro')

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

router.get('/', function(req, res, next){
    Ficheiro.getFicheiros()
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  router.get('/:idFicheiro', function(req, res, next){
    Ficheiro.getFicheiroAtomica(req.params.idFicheiro)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  router.get('/:idFicheiro/download', function(req, res, next){
    Ficheiro.getFicheiroPath(req.params.idFicheiro)
      .then(dados => {
        res.download(dados[0].localizacao)
      })
      .catch(erro => res.status(500).jsonp(erro))
  })

// -------------------------------------------------------------- POST ---------------------------------------------------------------------

    router.post('/', function(req, res){
        //console.log(req.files)
        console.log(req)
        Ficheiro.insereFicheiro(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
    
    })


  module.exports = router;