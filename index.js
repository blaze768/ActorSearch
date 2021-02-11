const express = require('express')
const app = express()
const bp = require('body-parser')
const PORT = 3000
var search = require('./search.json')
var movData = require('./data.json')
var {getJSONData} = require('./func.js')
var {storeSearch} = require('./func.js')

app.use(bp())

var url ='https://api.themoviedb.org/3/search/person?api_key=07a240cb378733627b949d3c46e885c3&language=en-US&query='+ search.first + '%20' + search.last 

app.post('/actorsearch', (req, res) => {
    console.log('x')
    if(!req.body) res.status(400).send({message: 'no body'})
    //query database
    if(req.body.first === '' || req.body.last === ''){
        res.send({message: 'please reenter search'})
    }
    else{
        res.send({message: 'searching...'})
        storeSearch(req.body)
    }
})

app.get('/actorsearch/results', (req, res) =>{
    console.log('x')
    getJSONData(url, res, movData, search.first, search.last)
})


app.listen(PORT, () => {
    console.log(`Running...`)
})