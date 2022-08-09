require('dotenv').config()
const mongoose = require('mongoose')

const connectionStr = process.env.MONGODB_STRING

mongoose.connect(connectionStr, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("Connected to mongodb"))
.catch(error => console.log(error))

mongoose.connection.on("error", error => {
    console.log(error)
})