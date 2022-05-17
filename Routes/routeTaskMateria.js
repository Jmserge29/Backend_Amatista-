const express = require('express')

const tareasCtrl = require('../controllers/controllerTasks')

const router = express.Router()

router.post('/createTasks', tareasCtrl.createtareas)
router.put('/GetTask/:id', tareasCtrl.updatetareas)
router.put('/GetTask_id/:materia', tareasCtrl.updatetareasId)
router.delete('/GetTask/:id', tareasCtrl.deletetareas)
router.delete('/GetTask_id/:materia', tareasCtrl.deletetareasId)
router.get('/GetTask/:id', tareasCtrl.gettareasById)
router.get('/GetTask_id/:materia', tareasCtrl.gettareasByIden)
router.get('/GetTasksAlls', tareasCtrl.gettareass)

module.exports = router