// ---------------------------------------- Ficheiro ------------------------
var express = require('express');
var router = express.Router();
const fs = require('fs')
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
const mkdirp = require('mkdirp-promise')
var md5 = require('md5');
var passport = require('passport')

var idUtilizador = "lguilhermem@hotmail.com"

var Ficheiro = require('../controllers/ficheiro');
const { resolveSoa } = require('dns');

// ---------- ROTA   : /api/ficheiros ....

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

// Todos os ficheiros do sistema
router.get('/', passport.authenticate('jwt', {session: false}),  function(req, res, next){
    Ficheiro.getFicheiros()
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // Toda a informação relativa a um ficheiro
  router.get('/:idFicheiro', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Ficheiro.getFicheiroAtomica(req.params.idFicheiro)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // Download de um ficheiro
  router.get('/:idFicheiro/download', passport.authenticate('jwt', {session: false}), function(req, res, next){
    Ficheiro.getFicheiroPath(req.params.idFicheiro)
      .then(dados => {
        res.download(__dirname + dados[0].localizacao)
      })
      .catch(erro => res.status(500).jsonp(erro))
  })


// -------------------------------------------------------------- POST ---------------------------------------------------------------------
// Inserir imagem de perfil
router.post('/fotoPerfil', upload.single('ficheiro'), passport.authenticate('jwt', {session: false}), function(req, res){

  let oldPath = __dirname + '/../'+req.file.path
  let newPath = '/../public/images/'
  let name = req.file.originalname

  //let type = name.split(".")[1] 

  fs.readFile(oldPath, function(err, buf) {
        if(err) throw err

        newPath = newPath + idUtilizador;
        fs.rename(oldPath, __dirname + newPath, function(err){
          if(err) throw err
          res.jsonp(1)
        })
  })
})

// Inserir um novo ficheiro
    router.post('/', upload.array('ficheiro'), passport.authenticate('jwt', {session: false}), function(req, res){
      addFiles(req.files, req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
      
    })

    function addFiles(files, body) {
      return new Promise((resolve, reject) => {
      
        var ids = [];
        var length = files.length - 1
        for(var i = j = 0; i <= length; i++){
    
          let oldPath = __dirname + '/../'+files[i].path
          let newPath = '/../ficheiros/'
          let guardadoEm = body.guardadoEm
          let name = files[i].originalname
          let size = files[i].size
          let type = files[i].mimetype
      
          fs.readFile(oldPath, function(err, buf) {
            var string = md5(buf);
            var string1 = string.substring(0, 8);
            var string2 = string.substring(8, 16);
            var string3 = string.substring(16, 24);
            var string4 = string.substring(24, 32);
            
            newPath = newPath + string1 + '/' + string2 + '/' + string3 + '/' + string4 + '/';
    
            mkdirp(__dirname + newPath)
              .then(dados => {
                newPath = newPath + name;
      
                fs.copyFile(oldPath, __dirname + newPath, function(err){
                  if(err) throw err
                  fs.unlinkSync(oldPath);
                })
          
                console.log(name)
                Ficheiro.insereFicheiro(guardadoEm, name, newPath, size, type)
                  .then(id => {
                    console.log(id)
                    ids.push(id); 
                    
                    if(j++ == length) resolve(ids);
                      
                  })
                  .catch(erro => { reject(erro)})
              })
              .catch(erro => reject(erro))
      
            
      
          });
         
        }
          
      });
    }

    router.post('/pastas', upload.array('ficheiro'), passport.authenticate('jwt', {session: false}), function(req, res){
      addFilesPasta(req.files, req.body)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
      
    })

    function addFilesPasta(files, body) {
      return new Promise((resolve, reject) => {
      
        var ids = [];
        var length = files.length - 1
        for(var i = j = 0; i <= length; i++){
    
          let oldPath = __dirname + '/../'+files[i].path
          let newPath = '/../ficheiros/'
          let guardadoEm = body.guardadoEm
          let name = files[i].originalname
          let size = files[i].size
          let type = files[i].mimetype
      
          fs.readFile(oldPath, function(err, buf) {
            var string = md5(buf);
            var string1 = string.substring(0, 8);
            var string2 = string.substring(8, 16);
            var string3 = string.substring(16, 24);
            var string4 = string.substring(24, 32);
            
            newPath = newPath + string1 + '/' + string2 + '/' + string3 + '/' + string4 + '/';
    
            mkdirp(__dirname + newPath)
              .then(dados => {

                newPath = newPath + name;

                fs.copyFile(oldPath, __dirname + newPath, function(err){
                  if(err) throw err
                  fs.unlinkSync(oldPath);
                })
          
                Ficheiro.insereFicheiroPasta(guardadoEm, name, newPath, size, type)
                  .then(id => {
                    console.log(id)
                    ids.push(id); 
                    
                    if(j++ == length) resolve(ids);
                      
                  })
                  .catch(erro => { reject(erro)})
              })
              .catch(erro => reject(erro))
      
            
      
          });
         
        }
          
      });
    }

    //-------------------------------------------------------- DELETE -------------------------------------------------------------------

    router.delete('/:idFicheiro', function(req, res, next){
      Ficheiro.getFicheiroPath(req.params.idFicheiro)
        .then(dados => {
        fs.unlinkSync(__dirname + dados[0].localizacao);
          Ficheiro.deleteFicheiro(req.params.idFicheiro)
          .then(dados => res.jsonp(dados))
          .catch(erro => res.status(500).jsonp(erro))
        })
        .catch(erro => res.status(500).jsonp(erro))
    })

  module.exports = router;