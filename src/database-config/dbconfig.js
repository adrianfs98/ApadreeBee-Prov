const mysql = require('mysql2');
const {
    promisify
} = require('util')


const dbconfig = {
    host: 'localhost',
    user: 'root',
    database: 'test',
    waitForConnections: true
}


const pool = mysql.createPool(dbconfig)

pool.getConnection((err, res) => {
    if (err) {
        throw err;
    }
    if (res) {
        res.release()
        console.log('connected to DB')
        return
    }
})

pool.query = promisify(pool.query)

module.exports = {
    pool
}