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

fastify.get('/', function handler(request, reply) {
    reply.status(200).send({ message: 'HELLO ME' })
})

fastify.listen({ port: process.env.APP_PORT || 3000, host: process.env.APP_HOST }, (err) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})