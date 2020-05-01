const instructor = require('../models/instructor')

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