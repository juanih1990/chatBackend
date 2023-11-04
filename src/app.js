import express from 'express'
import routerView from './routes/views.router.js'
import handlebars from 'express-handlebars'
import __dirname from './ultil.js'
import { Server } from 'socket.io'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static( __dirname + '/public'))

app.engine('handlebars' , handlebars.engine())
app.set('views', __dirname + '/views' )
app.set('view engine' , 'handlebars')

app.use('/' , routerView)

const httpServer = app.listen(8080 , () => { console.log('running ....')})
const io = new Server(httpServer)

const messages = []

io.on('connection', socket => {
    console.log('new socket')

    socket.on('message' , data => {
        messages.push(data)
        console.log(data)
        io.emit('logs',messages)
    })

})