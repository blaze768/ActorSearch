const express = require('express')
const app = express()
const bp = require('body-parser')
const mongoClient = require('mongodb');
const PORT = 5000
const url = "mongodb://localhost:27017/";
const actorName = "Tom Hardy"
const id = "123456789"

app.get('/', (req, res) =>{
    console.log('x')
    //getJSONData(url, res, movData, search.first, search.last)
})

app.use(bp())

app.post('/actorsearch', (req, res) => {
    console.log('x')
    if(!req.body) res.status(400).send({message: 'no body'})
    res.status(200).send('good');
    //query database
    mongoClient.connect(url, function(err){
      if (err) throw err;
      var dbo = db.db("actorsearch");
      var myquery = {actorName};
      var newvalues = { $set: {actor: actorName, actorID: id} };
      dbo.collection("actorInfo").insertMany(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("Data inserted");
        db.close();
      })
    })
})

app.listen(PORT, () => {
    console.log(`Running...`)
})