// ---------------------------------------- Ficheiro ------------------------
var express = require('express');
var router = express.Router();
const fs = require('fs')
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
const mkdirp = require('mkdirp-promise')
var md5 = require('md5');

const { resolveSoa } = require('dns');
const { default: Axios } = require('axios');

// ---------- ROTA   : /api/ficheiros ....

// -------------------------------------------------------------- GET ---------------------------------------------------------------------

// Todos os ficheiros do sistema
router.get('/', function(req, res, next){
    Ficheiro.getFicheiros()
      .then(dados => res.jsonp(dados))
      .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // Toda a informação relativa a um ficheiro
  router.get('/:idFicheiro', function(req, res, next){
    Ficheiro.getFicheiroAtomica(req.params.idFicheiro)
       .then(dados => res.jsonp(dados))
       .catch(erro => {console.log(erro); res.status(500).jsonp(erro) })
  })
  
  // Download de um ficheiro
  router.get('/:idFicheiro/download', function(req, res, next){
    Ficheiro.getFicheiroPath(req.params.idFicheiro)
      .then(dados => {
        res.download(dados[0].localizacao)
      })
      .catch(erro => res.status(500).jsonp(erro))
  })


// -------------------------------------------------------------- POST ---------------------------------------------------------------------
// Inserir imagem de perfil
router.post('/fotoPerfil', upload.single('ficheiro'), function(req, res){

  let oldPath = __dirname + '/../'+req.file.path
  let newPath = __dirname + '/../public/images/'
  let idUtilizador = req.body.idUtilizador
  //let type = name.split(".")[1] 

  fs.readFile(oldPath, function(err, buf) {
        if(err) throw err

        newPath = newPath + idUtilizador;
        fs.rename(oldPath, newPath, function(err){
          if(err) throw err
          res.jsonp(1)
        })
  })
})

// Inserir um novo ficheiro
    router.post('/', upload.array('ficheiro'), function(req, res){
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
          let newPath = __dirname + '/../ficheiros/'
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
    
            mkdirp(newPath)
              .then(dados => {
                newPath = newPath + name;
      
                fs.rename(oldPath, newPath, function(err){
                  if(err) throw err
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



  module.exports = router;