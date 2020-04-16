var Connection = module.exports

var axios = require('axios')


var ontologyname = 'UMbook#'

Connection.ontologyname = ontologyname

var prefixes = `
    PREFIX rdf: <w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <w3.org/2002/07/owl#>
    PREFIX rdfs: <w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <ontotext.com/explicit>
    PREFIX skos: <w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.semanticweb.org/filip/ontologies/2020/1/${ontologyname}>
`
Connection.prefixes = prefixes

var getLink = "http://localhost:7200/repositories/UMbook" + "?query=" 

Connection.getLink = getLink

var postLink = "http://localhost:7200/repositories/UMbook" + "/statements"

Connection.postLink = postLink


function normalize(response) {
    return response.results.bindings.map(obj =>
        Object.entries(obj)
            .reduce((new_obj, [k,v]) => (new_obj[k] = v.value, new_obj),
                    new Object()));
};

Connection.makeQuery = async function(query){
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Connection.makePost = async function(query){
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(postLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    }
}