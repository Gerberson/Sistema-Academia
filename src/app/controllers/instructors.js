const { age, date } = require('../../lib/utils')
const db = require('../../config/db')

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
        
        const query =`
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            req.body.name,
            req.body.avatar_url,
            req.body.gender,
            req.body.services,
            date(req.body.birth).iso,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, result){
            if (err) return res.send('Database Error!')

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