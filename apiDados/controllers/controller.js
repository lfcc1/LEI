var axios = require('axios')

var Filmes = module.exports

var prefixes = `
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                prefix owl: <http://www.w3.org/2002/07/owl#>
                prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
                PREFIX noInferences: <http://www.ontotext.com/explicit>
                PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
                PREFIX amd: <http://www.prc.com/obras#> 
                `

var getLink = "http://localhost:7200/repositories/EMD" + "?query="

function makeQuery(query){
    var encoded = encodeURIComponent(prefixes + query)

    axios.get(getLink + encoded)
        .then(dados => { 
            return dados;
        })
        .catch(erro => console.log(erro))

}

const Controller = module.exports

Controller.getCursos = () =>{
    return new Promise(function(resolve, reject){
        var query = ` Select ?idCurso where{
            ?idCurso rdf:type UMBook:Curso. 
        }
        Order by ?idCurso
        `
        dados = makeQuery(query)
        
        var myData = []
        myData = dados.data.results.bindings.map(obra => { 
                                          return {id: obra.id.value.split('#')[1], 
                                                 tit: obra.tit.value,
                                                 nparts: obra.nparts.value
        }})
        console.log(myData)

        resolve(myData)
        

    })
}
