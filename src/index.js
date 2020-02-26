// environment configs
require('dotenv').config()

const path = require('path')
const bodyParser = require('body-parser')



const {
  MONGO_DB_NAME,
  MONGO_LOCAL_CONN_URL
} = process.env

global.express = require('express')
global.mongoose = require('mongoose')
global.connUri = MONGO_LOCAL_CONN_URL

const app = express()
const personRoute = require('./routes/person')
const costumerRoute = require('./routes/customer')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req,res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`)
  next()
})

app.use(personRoute)
app.use(costumerRoute)

// Handler for Error 404 -- Resource not found
app.use((req, res, next) => {
  res.status(404).send('I think you are lost!')
})

// Handler for Error 500
app.use((err, req,res, next) => {
  console.error(err)

  res.sendFile(path.join(__dirname, '../public/500.html'))
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => `Server is listening on ${PORT}`)
