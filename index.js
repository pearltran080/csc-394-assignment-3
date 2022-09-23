const express = require('express')
const path = require('path')
const app = express()

// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// database
const Pool = require('pg').Pool
var connection = null;
if (process.env.DATABASE_URL != null) {
    connection = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }
} else {
    connection = {
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'galaxy88',
        port: 5432
    }
}
const pool = new Pool(connection)
app.get ('/', function(req, res) {
    pool.query('SELECT VERSION()', (err, version_results) => {
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        res.render('index', {
            title: "Pearleen Tran's HW3",
            databaseVer: version_results.rows[0].version
        })
    })
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})