const express = require('express')

const NotesGeneralsCtrl = require('../controllers/controllerNotesGenerals')

const router = express.Router()

router.post('/createNotesGenerals', NotesGeneralsCtrl.createNote)
//Ruta POST
router.put('/NotesGenerals/:id', NotesGeneralsCtrl.updateNote)
router.put('/NotesGeneralsCollection/:collectionUniversity', NotesGeneralsCtrl.updateNoteId)
//Ruta PUT
router.delete('/NotesGenerals/:id', NotesGeneralsCtrl.deleteNote)
router.delete('/NotesGeneralsCollection/:collectionUniversity', NotesGeneralsCtrl.deleteNoteId)
//Ruta DELETE
router.get('/GetNotesGenerals/:id', NotesGeneralsCtrl.getNoteById)
router.get('/NotesGeneralsCollection/:collectionUniversity', NotesGeneralsCtrl.getNoteByCollectionUniversity)
router.get('/GetNotesGenerals', NotesGeneralsCtrl.getNotes)
//Ruta GET

module.exports = router