//aqui vamos a declarar variables de forma global a todo el proyecto, aqui por ejemplo iran las variables del puerto o del path de acceso a la bd, ya que son diferentes si estamos en desarrollo o en produccion

//process es un objeto global de node que esta corriendo a lo largo de la aplicacion de node y este objeto es actualzado dependiendo del entorno donde esta corriendo

//===========================
//puerto
//=======================
process.env.PORT = process.env.PORT || 3000