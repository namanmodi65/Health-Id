const connectToMongo = require("./db")
const express = require('express')
var cors = require('cors')

connectToMongo()

const app = express()
const port = 3001
app.use(cors())

app.use(express.json())

//   ALL ROUTES.............
app.use('/api/auth',require('./routes/auth'))
app.use('/api/reports',require('./routes/reports'))

app.listen(port, () => {
  console.log(`backend listening on http://localhost:${port}`)
})