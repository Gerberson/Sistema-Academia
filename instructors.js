// Serve para criar json com os dados simulando o BD
const fs = require('fs')
const data = require('./data.json')

//req.query.id = ?id=1
//req.body
//req.params.id = /:id
exports.findById = function(req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor) {
        return id == instructor.id
    })

    if (!foundInstructor)
        return res.send('Instrutor não encontrado!')

    const instructor = {
        ...foundInstructor,
        age: "",
        services: foundInstructor.services.split(","),
        created_at: "",
    }

    return res.render('instructors/show', { instructor })
}

exports.post = function(req, res){

    // Transforma o json em objeto(array)
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "")
            return res.send('Preencha todos os campos!')
    }
    req.body.birth = Date.parse(req.body.birth)
    req.body.created_at = Date.now()
    req.body.id = Number(data.instructors.length + 1)

    // Destruturar os dados, garante que não sera passado dados maliciosos 
    const {avatar_url, birth, created_at, id, name, services, gender } = req.body

    data.instructors.push({
        id,
        name,
        avatar_url,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Os dados não foram salvos!')

        return res.redirect('/instructors')
    })

    //return res.send(req.body)
}