const express = require('express')

const UserCtrl = require('../controllers/controllerUser')

const router = express.Router()

// router.put('/user/:id', UserCtrl.updateUser)
// router.put('/usuario/:cedula', UserCtrl.updateUserCedula)

// router.delete('/user/:id', UserCtrl.deleteUser)

// router.get('/user/:id', UserCtrl.getUserById)
// router.get('/usuario/:cedula', UserCtrl.getUserByCedula)
// router.get('/users', UserCtrl.getUsers)

router.post('/signup', UserCtrl.signup)
router.post('/signin', UserCtrl.signin)
// router.get('/me', UserCtrl.me)
router.get('/me', UserCtrl.me)
router.get('/userData', UserCtrl.DataUser)
router.get('/Auth', UserCtrl.AuthToken)


module.exports = router