const express = require('express')
require('./connection')
const cors = require('cors')
const app = express()
const http = require('http')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, {
    cors: 'http://localhost:3000',
    method: ['GET', 'POST', 'PATCH', 'DELETE']
})

const User = require('./models/User')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const imageRoutes = require('./routes/imageRoutes')
const orderRoutes = require('./routes/orderRoutes')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//routes
app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/images', imageRoutes)
app.use('/orders', orderRoutes)

//serve static assets
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join('client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
    })
}

app.post('/create-payment', async (req, res) => {
    const {amount} = req.body
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ['card'],
            
        })
        res.status(200).json(paymentIntent)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

server.listen(process.env.PORT || 8080, ()=>{
    console.log(`Server running on PORT:`, 8080)
})

app.set('socketio', io)