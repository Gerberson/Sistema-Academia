const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const bodyParser = require('body-parser')

const server = express()

server.use(express.static('public'))
server.use(routes)
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function () {
    console.log ('server is running')
})