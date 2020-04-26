// Serve para criar json com os dados simulando o BD
const fs = require('fs')
const data = require('./data.json')

exports.post = function(req, res){

    // Transforma o json em objeto(array)
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "")
            return res.send('Preencha todos os campos!')
    }

    data.instructors.push(req.body)

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Os dados não foram salvos!')

        return res.redirect('/instructors')
    })

    //return res.send(req.body)
}