const express = require('express')
const app = express()

app.get ('/', function(req, res) {
    res.send('test')
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})