const instructor = require('../models/instructor')
const { age } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        instructor.all(function(instructors) {
            return res.render('instructors/index', { instructors })
        })
    },
    create(req, res) {
        return res.render('instructors/create')
    },
    show(req, res) {
        instructor.find(req.params.id, function(instructor) {
            if(!instructor) return res.send('Instrutor não encontrado.')

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(',')

            instructor.created_at = date(instructor.created_at).format

            return res.render('instructors/show', instructor)
        })
        return
    },
    post(req, res) {
        instructor.create(req.body, function(instructor) {
            return res.redirect(`/instructors/${result.rows[0].id}`)
        })
    },
    edit(req, res) {
        return
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send('Preencha todos os campos!')
        }
        return
    },
    delete(req, res) {
        return
    },
    findById(id) {
        const foundInstructor = bd.instructors.find(function(instructor) {
            return id == instructor.id
        })
    
        if (!foundInstructor)
            return false
    
        const instructor = {
            ...foundInstructor,
            birth: date(foundInstructor.birth).iso,
            age: age(foundInstructor.birth),
            services: foundInstructor.services.split(","),
            created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
        }
    
        return instructor
    }
}