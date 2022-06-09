const NotesByM = require('../Models/NotesByMateria')



createNote = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a note',
        })
    }

    const note = new NotesByM(body)

    if (!note) {
        return res.status(400).json({ success: false, error: err })
    }

    note
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: note._id,
                message: 'note created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'note not created!',
            })
        })
}

updateNote = async (req, res) => {
    const NotesMUpdated = await NotesByM.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(NotesMUpdated)
}

updateNoteId = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    note.findOne({ materia: req.params.materia }, (err, note) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'note not found!',
            })
        }

        note.titulo = body.titulo
        note.estado = body.estado
        note.descripcion = body.descripcion
        note.fecha = body.fecha
        note.materia = body.materia
        
        note
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    identificador: note.identificador,
                    message: 'note updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'note not updated!',
                })
            })
    })
}


deleteNote = async (req, res) => {
    await NotesByM.findOneAndDelete({ _id: req.params.id }, (err, note) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!note) {
            return res
                .status(404)
                .json({ success: false, error: `note not found` })
        }

        return res.status(200).json({ success: true, data: note })
    }).catch(err => console.log(err))
}

deleteNoteId = async (req, res) => {
    await NotesByM.findOneAndDelete({ carrera: req.params.carrera }, (err, note) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!note) {
            return res
                .status(404)
                .json({ success: false, error: `note not found` })
        }

        return res.status(200).json({ success: true, data: note })
    }).catch(err => console.log(err))
}

getNoteById = async (req, res) => {
    await NotesByM.findOne({ _id: req.params.id }, (err, note) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
    }

        return res.status(200).json({ success: true, data: note })
    }).catch(err => console.log(err))
}

getNoteByIden = async (req, res) => {
    await NotesByM.findOne({ identificador: req.params.identificador }, (err, note) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: note })
    }).catch(err => console.log(err))
}

getNoteByMateria = async (req, res) => {
    await NotesByM.findOne({ carrera: req.params.carrera }, (err, note) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: note })
    }).catch(err => console.log(err))
}

getNotes = async (req, res) => {
    await NotesByM.find({}, (err, collections) => {
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


module.exports = {
    createNote,
    updateNote,
    updateNoteId,
    deleteNote,
    deleteNoteId,
    getNoteById,
    getNoteByIden,
    getNoteByMateria,
    getNotes
}