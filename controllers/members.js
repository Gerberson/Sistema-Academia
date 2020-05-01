// Serve para criar json com os dados simulando o BD
const fs = require('fs')
const bd = require('../data.json')
const { age, date } = require('../utils')

//req.query.id = ?id=1
//req.body
//req.params.id = /:id
exports.index = function(req, res){

    return res.render('members/index', { members: bd.members })
}

exports.create = function(req, res){
    return res.render('members/create')
}

exports.show = function(req, res) {
    const { id } = req.params

    const data = findById(id)

    if (!data)
        return res.send('Instrutor não encontrado!')

    const memberFound = {
        ...data,
        birth: date(data.birth).birthDay
    }

    return res.render('members/show', { member: memberFound })
}

exports.post = function(req, res){

    // Transforma o json em objeto(array)
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "")
            return res.send('Preencha todos os campos!')
    }
    
    birth = Date.parse(req.body.birth)

    let id = 1 

    const lastMember = bd.members[bd.members.length - 1]

    if (lastMember) {
        id = lastMember.id + 1
    }


    bd.members.push({
        ...req.body,
        id,
        birth
    })

    fs.writeFile('data.json', JSON.stringify(bd, null, 2), function(err){
        if (err) return res.send('Os dados não foram salvos!')

        return res.redirect('/members')
    })

    //return res.send(req.body)
}

exports.edit = function(req, res){
    const { id } = req.params

    const data = findById(id)

    if (!data)
        return res.send('Instrutor não encontrado!')

    const memberFound = {
        ...data,
        birth: date(data.birth).iso
    }

    return res.render('members/edit', { member: memberFound })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundMember = bd.members.find(function(member, foundIndex) {
        if (id == member.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember)
        return res.send('Instrutor não encontrado!')

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    bd.members[index] = member

    fs.writeFile("data.json", JSON.stringify(bd, null, 2), function(err){
        if (err)
            return res.send('O instrutor não foi alterado')
        
        return res.redirect(`/members/${id}`)
    })
}

exports.delete = function(req, res){
    const { id } = req.body

    const filteredMembers = bd.members.filter(function(member){
        return member.id != id
    })

    bd.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(bd, null, 2), function(err){
        if (err) 
            return res.send('O instrutor não foi deletado')
        
        return res.redirect('/members')
    })
}

function findById(id){
    const foundMember = bd.members.find(function(member) {
        return id == member.id
    })

    if (!foundMember)
        return false

    const member = {
        ...foundMember,
        age: age(foundMember.birth),
    }

    return member
}