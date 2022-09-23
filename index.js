const express = require('express')
const path = require('path')
const app = express()
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:galaxy88@db-hw3.cfssmhuslkyb.us-east-2.rds.amazonaws.com:5432/postgres')

// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// database
app.get('/', function(req, res) {
    db.one('SELECT VERSION()')
        .then((data) => {
            res.render('index', {
                title: "Pearleen Tran's HW3",
                databaseVer: data.version
            })
        })
        .catch((error) => {
            console.log('ERROR:', error)
          })
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})