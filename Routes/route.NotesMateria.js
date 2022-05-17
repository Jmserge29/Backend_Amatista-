const express = require('express')

const NotesByMateriaCtrl = require('../controllers/controllerNotesByMateria')

const router = express.Router()

router.post('/createNotesByMateria', NotesByMateriaCtrl.createNote)
//Ruta POST
router.put('/NotesByMateria/:id', NotesByMateriaCtrl.updateNote)
router.put('/NotesByMateria/:materia', NotesByMateriaCtrl.updateNoteId)
//Ruta PUT
router.delete('/NotesByMateria/:id', NotesByMateriaCtrl.deleteNote)
router.delete('/NotesByMateria/:materia', NotesByMateriaCtrl.deleteNoteId)
//Ruta DELETE
router.get('/GetNotesByMateria/:id', NotesByMateriaCtrl.getNoteById)
router.get('/NotesByMateria/:materia', NotesByMateriaCtrl.getNoteByMateria)
router.get('/GetNotesByMateria', NotesByMateriaCtrl.getNotes)
//Ruta GET


module.exports = router