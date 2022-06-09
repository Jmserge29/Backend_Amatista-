const express = require('express')

const tareasCtrl = require('../controllers/controllerTasks')

const router = express.Router()

router.post('/createTasks', tareasCtrl.createTask)
router.put('/GetTask/:id', tareasCtrl.updateTask)
router.put('/GetTask_id/:materia', tareasCtrl.updateTaskId)
router.delete('/GetTask/:id', tareasCtrl.deleteTask)
router.delete('/GetTask_id/:materia', tareasCtrl.deleteTaskId)
router.get('/GetTask/:id', tareasCtrl.getTaskById)
router.get('/GetTask_id/:materia', tareasCtrl.getTaskByMateria)
router.get('/GetTasksAlls', tareasCtrl.getTasks)

module.exports = router