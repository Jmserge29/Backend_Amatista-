const MateriasCollection = require('../Models/MateriasCollection')
const Task = require('../Models/TaskUniversity')


createCollection = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a materia',
        })
    }

    const materia = new MateriasCollection(body)

    if (!materia) {
        return res.status(400).json({ success: false, error: err })
    }

    materia
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: materia._id,
                message: 'materia created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'materia not created!',
            })
        })
}

updateCollection = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    materia.findOne({ _id: req.params.id }, (err, materia) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'materia not found!',
            })
        }

        materia.name = body.name
        materia.collectionUniversity = body.collectionUniversity
        materia.teacher = body.teacher
        materia.day_week = body.day_week

        materia
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: tareas._id,
                    message: 'materia updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'materia not updated!',
                })
            })
    })
}

updateCollectionId = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    materia.findOne({ identificador: req.params.identificador }, (err, materia) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'materia not found!',
            })
        }

        materia.name = body.name
        materia.collectionUniversity = body.collectionUniversity
        materia.teacher = body.teacher
        materia.day_week = body.day_week
        
        materia
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    identificador: materia.identificador,
                    message: 'materia updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'materia not updated!',
                })
            })
    })
}


deleteCollection = async (req, res) => {
    await MateriasCollection.findOneAndDelete({ _id: req.params.id }, (err, materia) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!materia) {
            return res
                .status(404)
                .json({ success: false, error: `materia not found` })
        }

        return res.status(200).json({ success: true, data: materia })
    }).catch(err => console.log(err))
}

deleteCollectionId = async (req, res) => {
    await MateriasCollection.findOneAndDelete({ identificador: req.params.identificador }, (err, materia) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!materia) {
            return res
                .status(404)
                .json({ success: false, error: `materia not found` })
        }

        return res.status(200).json({ success: true, data: materia })
    }).catch(err => console.log(err))
}

getCollectionById = async (req, res) => {
    await MateriasCollection.findOne({ _id: req.params.id }, (err, materia) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
    }

        return res.status(200).json({ success: true, data: materia })
    }).catch(err => console.log(err))
}

getCollectionByIden = async (req, res) => {
    await MateriasCollection.findOne({ identificador: req.params.identificador }, (err, materia) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: materia })
    }).catch(err => console.log(err))
}

getCollectionByCollectionUniversity = async (req, res) => {
    await MateriasCollection.find({ collectionUniversity: req.params.collectionUniversity }, (err, collectionUniversity) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: collectionUniversity })
    }).catch(err => console.log(err))
}

getCollections = async (req, res) => {
    await MateriasCollection.find({}, (err, collections) => {
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

Dashboard = async (req, res) => {
    // Obtengo la data de las materias asignadas a esa collection, materias = data 
    const materias = await MateriasCollection.find({ collectionUniversity: req.params.collectionUniversity });
    // Mapeo los vectores de las materias para la cantidad total de materias que tiene en un determinado día de la semana
    // var class_Monday = 0
    // var class_Tuesday = 0
    // var class_Wednesday = 0
    // var class_Thursday = 0
    // var class_Friday = 0
    
    // Mapeo el objeto de materias para obtener el _id de MongDB --> Proceder a buscar tasks
    const dataMaterias = await Promise.all(
        materias.map(async(dato) => {
        // console.log('Los _id De MongoDB Son: ',dato._id)
        // Materias_Id = Materias_Id+ ',' + dato._id

        // Buscar el objeto de las Tasks a partir de los id de las materias registrados anteriormente
        const dataTask = await Task.find({ materias: dato._id });
        var pruebaRea = 0
        var pruebaPen = 0
        var porcentaje = 0
        var totalTasks = 0
        var dta = 0
        const dataTareasA = dataTask.map(async(dataT)=>{
            totalTasks += 1
            if(dataT.estado == false){
                pruebaPen += 1
            } else if(dataT.estado == true){
                pruebaRea += 1
            } else {
                console.log('Se solapan los datos')
            }
        })
        
        if(totalTasks == 0){
            totalTasks = 1
        }
        porcentaje = ((100*pruebaRea)/totalTasks)       // 100% --> Total de tareas | porcentaje ? --> tareas Realizadas
        console.log('El Porcentaje general de la materia con _id: ',dato._id, ' es :', porcentaje + '%' )
        // console.log('Las tareas Pendientes son: ', pruebaPen)
        // console.log('Las tareas Realizadas son: ', pruebaRea)
        return {IDMongo: dato._id, name: dato.name, collectionUniversity: dato.collectionUniversity, teacher: dato.teacher, day_week: dato.day_week, porcentaje: porcentaje}
        })
    )
    console.log(dataMaterias)
        // materias.map((dato) => {
        // if(dato.day_week === 'Lunes'){
        //     class_Monday += 1
        // } else if (dato.day_week === 'Martes'){
        //     class_Tuesday += 1
        // } else if (dato.day_week === 'Miércoles'){
        //     class_Wednesday += 1
        // } else if (dato.day_week === 'Jueves'){
        //     class_Thursday += 1
        // } else if (dato.day_week === 'Viernes'){
        //     class_Friday += 1
        // } else {
        //     console.log('Se solapan los datos')
        // }
        // })
    res.status(201).json({message: true, data: dataMaterias})
}



module.exports = {
    createCollection,
    updateCollection,
    updateCollectionId,
    deleteCollection,
    deleteCollectionId,
    getCollectionById,
    getCollectionByIden,
    getCollectionByCollectionUniversity,
    getCollections,
    Dashboard
}