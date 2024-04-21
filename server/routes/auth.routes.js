const { signin, signup } = require('../controllers/auth.controller');

module.exports = function (fastify, opts, done) {
    fastify.post('/signin',{}, signin)
    fastify.post('/signup',{}, signup)
    done()
}