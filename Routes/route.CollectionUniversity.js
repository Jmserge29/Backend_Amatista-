const express = require('express')

const collectionCtrl = require('../controllers/controllerCollectionUniveristy')

const router = express.Router()

router.post('/createCollection', collectionCtrl.createCollection)
//Ruta POST
router.put('/Collection/:id', collectionCtrl.updateCollectionById)
router.put('/Collection_id/:_idUser', collectionCtrl.updateCollectionBy_idUser)
//Ruta PUT
router.delete('/Collection/:id', collectionCtrl.deleteCollectionById)
router.delete('/Collection_id/:_idUser', collectionCtrl.deleteCollectionBy_idUser)
//Ruta DELETE
router.get('/GetCollection/:id', collectionCtrl.getCollectionById)
router.get('/Collection_idUser/:_idUser', collectionCtrl.getCollectionBy_idUser)
router.get('/CollectionMaterias/:carrera', collectionCtrl.getCollectionByCarrera)
router.get('/GetCollections', collectionCtrl.getCollections)
//Ruta GET


module.exports = router