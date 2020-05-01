const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        return res.render('instructors/index')
    },
    create(req, res) {
        return res.render('instructors/create')
    },
    show(req, res) {
        return
    },
    post(req, res) {
        // Transforma o json em objeto(array)
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "")
                return res.send('Preencha todos os campos!')
        }
        req.body.birth = Date.parse(req.body.birth)
        req.body.created_at = Date.now()
        req.body.id = Number(bd.instructors.length + 1)

        return
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