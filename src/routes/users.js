const express = require('express')

const router = express.Router();



const pool = require('../database-config/dbconfig').pool



router.get('/users/:email', async (req, res) => {
    let email = req.params.email
    await pool.execute(
        `select *
        from users
        where email = ?`, [email],
        function (err, results, fields) {

            if (err) {
                throw err
            } else if (results.length == 0) {
                res.json({
                    ok: false,
                    status: 404,
                    messaje: `no se ha podido encontrar ningun usuario con el email ${email}`
                });
            } else {
                res.json({
                    ok: true,
                    status: 200,
                    results
                });
            }

            // fields contains extra meta data about results, if available

            //console.log(fields);
            // results contains rows returned by server

            // If you execute same statement again, it will be picked from a LRU cache
            // which will save query preparation time and give better performance
        }
    )
    /* let users = await getAllUsers()
    console.log(users)
    res.json(users) */

})

router.get('/users/', async (req, res) => {
    await pool.execute(
        `select *
        from users`,
        function (err, results, fields) {

            if (err) {
                throw err
            } else if (results.length == 0) {
                res.json({
                    ok: false,
                    status: 404,
                    messaje: `no s han podido encontrar usuarios en las DB`
                });
            } else {
                res.json({
                    ok: true,
                    status: 200,
                    results
                });
            }

            // fields contains extra meta data about results, if available

            //console.log(fields);
            // results contains rows returned by server

            // If you execute same statement again, it will be picked from a LRU cache
            // which will save query preparation time and give better performance
        }
    )
    /* let users = await getAllUsers()
    console.log(users)
    res.json(users) */

})

router.post('/users', async (req, res) => {
    let nombre = req.body.nombre
    let email = req.body.email
    let contraseña = req.body.contraseña
    let role = ''
    if (req.body.role == undefined) {
        role = 'USER_ROLE'
    } else if (req.body.role != 'USER_ROLE' || req.body.role != 'ADMIN_ROLE') {
        res.json({
            ok: false,
            status: 406,
            messaje: `el role introducido no es valido`
        })
    } else {
        role = req.body.role
    }
    pool.execute(
        `insert into users (nombre,email,contraseña,role)
            values (?, ?, ?, ?)`, [nombre, email, contraseña, role],
        function (err, results, fields) {

            if (err) {
                res.json(err)
                throw err
            } else if (results.length == 0) {
                res.json({
                    ok: false,
                    status: 404,
                    messaje: `no se ha podido encontrar ningun usuario con el email ${email}`
                });
            } else {
                res.json({
                    ok: true,
                    status: 200,
                    results
                });
            }

            // fields contains extra meta data about results, if available

            //console.log(fields);
            // results contains rows returned by server

            // If you execute same statement again, it will be picked from a LRU cache
            // which will save query preparation time and give better performance
        }
    )



})

module.exports = router