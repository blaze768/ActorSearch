const express = require('express')
const app = express()
const bp = require('body-parser')
const PORT = 9000
var search = require('./search.json')
var {storeSearch} = require('./func.js')

app.use(bp())

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

app.get('/actorsearch/:firstName/:lastName', (req, res) =>{
    console.log('x')
    //getJSONData(url, res, movData, search.first, search.last)
})


app.listen(PORT, () => {
    console.log(`Running...`)
})