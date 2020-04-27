exports.edit = function(req, res){
    const { id } = req.params

    const data = findId(id)

    return res.render('instructors/edit', { instructor: data })
}

function findId(id){
    const foundInstructor = data.instructors.find(function(instructor) {
        return id == instructor.id
    })

    if (!foundInstructor)
        return res.send('Instrutor não encontrado!')

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
    }

    return instructor
}