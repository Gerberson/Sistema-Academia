// Serve para criar json com os dados simulando o BD
const fs = require('fs')
const bd = require('./data.json')
const { age, date } = require('./utils')

//req.query.id = ?id=1
//req.body
//req.params.id = /:id
exports.show = function(req, res) {
    const { id } = req.params

    const data = findById(id)

    if (!data)
        return res.send('Instrutor não encontrado!')

    return res.render('instructors/show', { instructor: data })
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
    req.body.id = Number(bd.instructors.length + 1)

    // Destruturar os dados, garante que não sera passado dados maliciosos 
    const {avatar_url, birth, created_at, id, name, services, gender } = req.body

    bd.instructors.push({
        id,
        name,
        avatar_url,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(bd, null, 2), function(err){
        if (err) return res.send('Os dados não foram salvos!')

        return res.redirect('/instructors')
    })

    //return res.send(req.body)
}

exports.edit = function(req, res){
    const { id } = req.params

    const data = findById(id)

    if (!data)
        return res.send('Instrutor não encontrado!')

    return res.render('instructors/edit', { instructor: data })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundInstructor = bd.instructors.find(function(instructor, foundIndex) {
        if (id == instructor.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor)
        return res.send('Instrutor não encontrado!')

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    bd.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(bd, null, 2), function(err){
        if (err)
            return res.send('O instrutor não foi alterado')
        
        return res.redirect(`/instructors/${id}`)
    })
}

exports.delete = function(req, res){
    const { id } = req.body

    const filteredInstructors = bd.instructors.filter(function(instructor){
        return instructor.id != id
    })

    bd.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(bd, null, 2), function(err){
        if (err) 
            return res.send('O instrutor não foi deletado')
        
        return res.redirect('/instructors')
    })
}

function findById(id){
    const foundInstructor = bd.instructors.find(function(instructor) {
        return id == instructor.id
    })

    if (!foundInstructor)
        return false

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth),
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
    }

    return instructor
}