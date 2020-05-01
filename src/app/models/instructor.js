const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM instructors`, function(err, result) {
            if (err) return res.send('Database Error!')

            callback(result.rows)
        })
    },
    create(data, callback) {
        // Transforma o json em objeto(array)
        const keys = Object.keys(data)

        for (key of keys) {
            if (data[key] == "")
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
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            date(data.birth).iso,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, result){
            if (err) return res.send('Database Error!')

            callback(result.rows[0])
        }) 
    },
    find(id, callback) {
        db.query(`SELECT * FROM instructors WHERE id = $1`, [id], function(err, result) {
            if (err) return false

            callback(result.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE instructors SET
                avatar_url=($1),
                name=($2),
                birth($3),
                gender($4),
                services($5)
            WHERE id = $6
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]

        db.query(query, values, function(err, result) {
            if (err) return console.log(err)

            callback()
        })
    }
}