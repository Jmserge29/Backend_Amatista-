const express = require('express')

const materiaCtrl = require('../controllers/controllerMaterias')

const router = express.Router()

router.post('/createMaterias', materiaCtrl.createCollection)
//Ruta POST
router.put('/Materias/:id', materiaCtrl.updateCollection)
router.put('/Materias_id/:_idUser', materiaCtrl.updateCollectionId)
//Ruta PUT
router.delete('/Materias/:id', materiaCtrl.deleteCollection)
router.delete('/Materias_id/:_idUser', materiaCtrl.deleteCollectionId)
//Ruta DELETE
router.get('/GetMaterias/:id', materiaCtrl.getCollectionById)
router.get('/Materias_idUser/:_idUser', materiaCtrl.getCollectionByIden)
router.get('/MateriasCollectionUniversity/:collectionUniversity', materiaCtrl.getCollectionByCollectionUniversity)
router.get('/GetMaterias', materiaCtrl.getCollections)
router.get('/Dashboard/:collectionUniversity', materiaCtrl.Dashboard)

//Ruta GET


module.exports = router