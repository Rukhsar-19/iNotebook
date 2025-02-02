const connectToMongo=require('./db');
var cors=require('cors')
connectToMongo();


const express = require('express')
const app = express()
const port = 5000
// add a cor 
// var cors=require('cors')
app.use(cors())
// to remove undefined we use middle ware to deal request body
app.use(express.json())
// Avaible routes for link routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello rukhsar!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

