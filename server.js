const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")
const cors = require('cors')
// Basicas variables para el incicio de una aplicación de Backend
dotenv.config();
// Uso del paquete Dotenv para obtener las variables de entorno que instancié en el archivo .env
const RouteUser = require('./Routes/route.userUnivesrity')
const RouteMaterias = require('./Routes/route.MateriasUniveristy')
const RouteUniversity = require('./Routes/route.CollectionUniversity')
const RouteNoteM = require('./Routes/route.NotesMateria')
const RouteNoteG = require('./Routes/route.NotesGenerals')
// Importo las rutas de los dieferentes controladores y modelos utilizados

mongoose
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(()=>{
    console.log("Conected Database of MongoDB!")
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`Listen By Port ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})
// Server de Express escuchando y la base de datos de MongoDB
app.get('/', (req, res) => {
    res.send('Hi guys!, Whats up?')
})
// Ejemplo para verificar que si está cambiado como es el request del Backend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())
app.use('/User', RouteUser)
app.use('/Materia', RouteMaterias)
app.use('/University', RouteUniversity)
app.use('/NoteM', RouteNoteM)
app.use('/NoteG', RouteNoteG)

// Ejecución de variables de uso app.use()


