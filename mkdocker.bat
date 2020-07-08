#!/bin/bash
docker build ./apiChat -t umbook-apichat
echo 'Tagging'
docker tag umbook-apichat:latest bragamann/umbook-apichat:2020-07-03
echo 'Pushing'
docker push bragamann/umbook-apichat:2020-07-03
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/umbook-apichat:2020-07-03'




docker build ./apiDados -t umbook-apidados
echo 'Tagging'
docker tag umbook-apidados:latest bragamann/umbook-apidados:2020-07-03
echo 'Pushing'
docker push bragamann/umbook-apidados:2020-07-03
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/umbook-apidados:2020-07-03'



docker build ./apiLayer -t umbook-apilayer
echo 'Tagging'
docker tag umbook-apilayer:latest bragamann/umbook-apilayer:2020-07-03
echo 'Pushing'
docker push bragamann/umbook-apilayer:2020-07-03
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/umbook-apilayer:2020-07-03'



docker build ./interfaceApp -t umbook-interfaceapp
echo 'Tagging'
docker tag umbook-interfaceapp:latest bragamann/umbook-interfaceapp:2020-07-03
echo 'Pushing'
docker push bragamann/umbook-interfaceapp:2020-07-03
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/umbook-interfaceapp:2020-07-03'



docker build ./UMbookMongo -t umbook-mongo
echo 'Tagging'
docker tag umbook-mongo:latest bragamann/umbook-mongo:2020-07-03
echo 'Pushing'
docker push bragamann/umbook-mongo:2020-07-03
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/umbook-mongo:2020-07-03'


docker build ./Ontologia -t umbook-graphdb
echo 'Tagging'
docker tag umbook-graphdb:latest bragamann/umbook-graphdb:2020-07-03
echo 'Pushing'
docker push bragamann/umbook-graphdb:2020-07-03
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/umbook-graphdb:2020-07-03'


docker build ./authServer -t umbook-auth
echo 'Tagging'
docker tag umbook-auth:latest bragamann/umbook-auth:2020-07-03
echo 'Pushing'
docker push bragamann/umbook-auth:2020-07-03
echo 'Terminado'
echo 'Id da imagem no DHub: bragamann/umbook-auth:2020-07-03'


docker image prune

