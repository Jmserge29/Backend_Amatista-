const Task = require('../Models/TaskUniversity')



createTask = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a task',
        })
    }

    const task = new Task(body)

    if (!task) {
        return res.status(400).json({ success: false, error: err })
    }

    task
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: task._id,
                message: 'task created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'task not created!',
            })
        })
}

updateTask = async (req, res) => {
    const TaskUpdated = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(TaskUpdated)


    // const respuesta = Task.findOne({ _id: req.params.id }, (err, task) => {
    //     if (err) {
    //         return res.status(404).json({
    //             err,
    //             message: 'task not found!',
    //         })
    //     }
 
    //     console.log(respuesta)

    //     task.name = body.name
    //     task.fechaEntrega = body.fechaEntrega
    //     task.difficulty = body.difficulty
    //     task.estado = body.estado
    //     task.description = body.description
    //     task.category = body.category
    //     task.materias = body.materias

        
    //     task
    //         .save()
    //         .then(() => {
    //             return res.status(200).json({
    //                 success: true,
    //                 id: tareas._id,
    //                 message: 'task updated!',
    //             })
    //         })
    //         .catch(error => {
    //             return res.status(404).json({
    //                 error,
    //                 message: 'task not updated!',
    //             })
    //         })
    // })
}

updateTaskId = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    task.findOne({ materias: req.params.materias }, (err, task) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'task not found!',
            })
        }

        task.name = body.name
        task.fechaEntrega = body.fechaEntrega
        task.difficulty = body.difficulty
        task.estado = body.estado
        task.description = body.description
        task.category = body.category
        task.materias = body.materias
        
        task
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    identificador: task.identificador,
                    message: 'task updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'task not updated!',
                })
            })
    })
}


deleteTask = async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!task) {
            return res
                .status(404)
                .json({ success: false, error: `task not found` })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}

deleteTaskId = async (req, res) => {
    await Task.findOneAndDelete({ materias: req.params.materias }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!task) {
            return res
                .status(404)
                .json({ success: false, error: `task not found` })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}

getTaskById = async (req, res) => {
    await Task.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
    }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}

getTaskByIden = async (req, res) => {
    await Task.findOne({ identificador: req.params.identificador }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}

getTaskByMateria = async (req, res) => {
    await Task.findOne({ materias: req.params.materias }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}

getTasks = async (req, res) => {
    await Task.find({}, (err, collections) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!collections.length) {
            return res
                .status(404)
                .json({ success: false, error: `collections not found` })
        }
        
        return res.status(200).json({ success: true, data: collections })
    }).catch(err => console.log(err))
}

// Dashboard = async (req, res) => {
//     // Obtengo la data de las notas asignadas a esa collection, notes = data 
//     const notes = await Task.find({ collectionUniversity: req.params.collectionUniversity });
//     // Aquí le asigno la cantidad total de notas utilizando el vector de la data midiendo su longitud
//     const cant_notes= notes.length
//     // Mapeo los vectores de las notas para la cantidad total de materias que tiene en un determinado día de la semana
//     var cant = notes.filter(o => o.estado).length;

//     res.status(201).json({message: true, notas: cant_notes, activas: cant})
//     // res.json(materias)
// }



module.exports = {
    createTask,
    updateTask,
    updateTaskId,
    deleteTask,
    deleteTaskId,
    getTaskById,
    getTaskByIden,
    getTaskByMateria,
    getTasks
}