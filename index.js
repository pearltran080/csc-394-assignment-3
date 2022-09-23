const express = require('express')
const path = require('path')
const app = express()

// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// database
const {Client} = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'galaxy88',
    port: 5432
})

client.connect();

app.get ('/', function(req, res) {
    client.query('SELECT VERSION()', (err, version_results) => {
        if (err) {
            client.end()
            return console.error('Error executing query', err.stack)
        }

        res.render('index', {
            title: "Pearleen Tran's HW3",
            databaseVer: version_results.rows
        })
    })
    client.end()
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})