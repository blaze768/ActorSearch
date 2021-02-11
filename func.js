const fs = require('fs')
const fetch = require('node-fetch')

function getJSONData(url, res, movData, first, last){
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
        if (movData.results[i].name == first + ' '+ last){
            res.status(200).send(movData.results[i].known_for)
        }
        else{
            res.status(400).send({message: 'unable to get data'})
        }
    }
}


function storeSearch(data){
    var jsonString = JSON.stringify(data, null, 2)
    fs.writeFile('./search.json', jsonString, err => {
        if(err) {
            console.log('Error writing file', err)
        }
        else{
            console.log('Successfully wrote to file...')
        }
     })
}

module.exports = {
    getJSONData,
    storeSearch
}