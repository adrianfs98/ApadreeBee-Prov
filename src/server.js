require('./global-config/keys')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
//? PARA QUE SIRVE BODY-PARSER??
//*Usualmente el cuerpo de una peticion (payload), contiene información desde una petición tipo POST cuando un cliente desea crear una nueva entidad/registro o actualizar uno existente mediante PUT. Los desarrolladores quienes implementan servidores, requieren frecuentemente accesar a la información del cuerpo de dicha petición.

// *El módulo npm body-parser permite realizar esta tarea. No es necesario programarla. Solo se requiere instalar body-parser y habilitar json() así como url-encode como middlewares para convertir datos a JSON.
const bodyParser = require('body-parser')
const path = require('path')

//rutas-> las url de nuestro servidor
const routes = require('./routes/index')
const user_routes = require('./routes/users')

//initializations

const app = express()

const cors_options = {
    origin: "http://localhost:3001"
}
//en global-config/keys.js tenemos el puerto que debe usar express, por ejemplo

//middlewares-> se ejecutan cada vez que el usuario envia una peticion
//escribe por consola las peticiones que el servidor recibe
app.use(morgan('dev'))

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// variables globales
//aqui por ahora no haremos nada pero más tarde nos servirá para :
//tomar la info del usuario(con req), lo que el usuario quiere responder(con res) y con next es una funcion para seguir con la ejeccion del codigo
// esto lo vamos a usar para coger variables que queramos usar en cualquier parte
app.use((req, res, next) => {

    next()
})

app.use(routes)
//app.use('/api/users', require('./routes/users'))
app.use(user_routes)

//archivos publicos, html, css, imagenes...
//Public folder
app.use(express.static(path.join(__dirname, 'public')))

app.listen(process.env.PORT, () => {
    console.log('server running on port ' + process.env.PORT);
})