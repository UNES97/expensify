const fastify = require('fastify')(
    { 
        logger: true,
    }
)
const cors = require('@fastify/cors');
const fastifyStatic = require('@fastify/static')
require('dotenv').config()
fastify.register(cors, {
    origin: "*"
})

const db = require("./models");
db.Connection.sync({force: false}).then(() => {
    console.log('Synced DB');
}); 

fastify.register(require('./routes/auth.routes') , {prefix: 'api'})
fastify.register(require('./routes/transaction.routes') , {prefix: 'api'})

fastify.get('/', function handler(request, reply) {
    reply.status(200).send({ message: 'HELLO ME' })
})

fastify.listen({ port: process.env.APP_PORT || 3000, host: process.env.APP_HOST }, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})