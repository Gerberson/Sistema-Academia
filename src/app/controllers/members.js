const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        return res.render('members/index')
    },
    create(req, res) {
        return res.render('members/create')
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
        req.body.id = Number(bd.members.length + 1)

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
        const foundmember = bd.members.find(function(member) {
            return id == member.id
        })
    
        if (!foundmember)
            return false
    
        const member = {
            ...foundmember,
            birth: date(foundmember.birth).iso,
            age: age(foundmember.birth),
            services: foundmember.services.split(","),
            created_at: new Intl.DateTimeFormat("pt-BR").format(foundmember.created_at),
        }
    
        return member
    }
}