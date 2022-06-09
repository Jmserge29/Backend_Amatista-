const Collection = require('../Models/CollectionUniversity')

createCollection = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a collection',
        })
    }

    const collection = new Collection(body)

    if (!collection) {
        return res.status(400).json({ success: false, error: err })
    }

    collection
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: collection._id,
                message: 'collection created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'collection not created!',
            })
        })
}
//Crear una Colección Universidad
updateCollectionById = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    collection.findOne({ _id: req.params.id }, (err, collection) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'collection not found!',
            })
        }

        collection.name = body.name
        collection.ciudad = body.ciudad
        collection.semestre = body.semestre
        collection._idUser = body._idUser
        collection.carrera = body.carrera

        collection
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: tareas._id,
                    message: 'collection updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'collection not updated!',
                })
            })
    })
}
// Actualizar Collecion By Id
updateCollectionBy_idUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Collection.findOne({ _idUser: req.params._idUser }, (err, collection) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'collection not found!',
            })
        }

        collection.name = body.name
        collection.ciudad = body.ciudad
        collection.semestre = body.semestre
        collection._idUser = body._idUser
        collection.carrera = body.carrera
        
        collection
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    identificador: collection.identificador,
                    message: 'collection updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'collection not updated!',
                })
            })
    })
}
// Actualizar Collecion By _idUser
deleteCollectionById = async (req, res) => {
    await Collection.findOneAndDelete({ _id: req.params.id }, (err, collection) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!collection) {
            return res
                .status(404)
                .json({ success: false, error: `collection not found` })
        }

        return res.status(200).json({ success: true, data: collection })
    }).catch(err => console.log(err))
}
// Eliminar Collecion
deleteCollectionBy_idUser = async (req, res) => {
    await Collection.findOneAndDelete({ _idUser: req.params._idUser }, (err, collection) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!collection) {
            return res
                .status(404)
                .json({ success: false, error: `collection not found` })
        }

        return res.status(200).json({ success: true, data: collection })
    }).catch(err => console.log(err))
}
// Eliminar Collecion By _idUser
getCollectionById = async (req, res) => {
     await Collection.findOne({ _id: req.params.id }, (err, collection) => {
         if (err) {
             return res.status(400).json({ success: false, error: err })
        }

         return res.status(200).json({ success: true, data: collection })
     }).catch(err => console.log(err))
}
// Obtener Resultados de Collections de Universidades 
getCollectionBy_idUser = async (req, res) => {
    await Collection.find({ _idUser: req.params._idUser }, (err, collection) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: collection })
    }).catch(err => console.log(err))
}
// Obtener Resultados de Collections de Universidades por _idUser
getCollectionByCarrera = async (req, res) => {
    await Collection.findOne({ carrera: req.params.carrera }, (err, collection) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: collection })
    }).catch(err => console.log(err))
}
// Obtener Resultados de Collections de Universidades By carrera
getCollections = async (req, res) => {
    await Collection.find({}, (err, collections) => {
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
// Obtener todos las Universidades
countCollections = async (req, res) => {
    const cantidad = Collection.count();
    console.log(cantidad)
}
// Obtener la cantidad de Universidades
module.exports = {
    createCollection,
    updateCollectionById,
    updateCollectionBy_idUser,
    deleteCollectionById,
    deleteCollectionBy_idUser,
    getCollectionById,
    getCollectionBy_idUser,
    getCollectionByCarrera,
    getCollections,
    countCollections
}