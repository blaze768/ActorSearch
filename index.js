const express = require('express')
const fs = require('fs')
const app = express()
const bp = require('body-parser')
const fetch = require('node-fetch')
const PORT = 3000
const movData = require('./data.json')

app.use(bp())

var actorFirstName = 'Tom'
var actorLastName = 'Hardy'
var url = 'https://api.themoviedb.org/3/search/person?api_key=07a240cb378733627b949d3c46e885c3&language=en-US&query='+ actorFirstName + '%20' + actorLastName 
//console.log(url)
fetch(url, {
    method:"GET",
    header: {
        "Content-Type": "application/json"
    },
})
.then(response=>response.json())
.then(data => {
    var jsonString = JSON.stringify(data, null, 2)
    fs.writeFile('./data.json', jsonString, err => {
        if(err) {
            console.log('Error writing file', err)
        }
        else{
            console.log('Successfully wrote to file...')
        }
    })
})
.catch((error) => {
    console.error('Error:', error)
})

for (var i=0; i<movData.results.length; i++){
    if (movData.results[i].name == actorFirstName + ' '+ actorLastName){
        for(var j=0; j<movData.results[i].known_for.length; j++){
            var movTitle = JSON.stringify(movData.results[i].known_for[j].title, null, 2)
            var movSum = JSON.stringify(movData.results[i].known_for[j].overview, null, 2)
            var movPoster = JSON.stringify(movData.results[i].known_for[j].poster_path, null, 2)
            fs.writeFile('./final.json', movTitle, err => {
                if(err) {
                    console.log('Error writing file', err)
                }
                else{
                    console.log('Successfully wrote to file...')
                }
            })
        }
    }
}

app.post('/actorsearch', (req, res) => {
    if(!req.body) res.status(400).send({message: 'wrong'})
    res.status(200).send()
})

app.listen(PORT, () => {
    console.log(`Running...`)
})