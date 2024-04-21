const { createTransaction, getAllTransactions, getTransactionById, updateTransactionById, deleteTransactionById } = require('../controllers/transaction.controller');

module.exports = function (fastify, opts, done) {
    fastify.post('/transactions', {}, createTransaction);
    fastify.get('/transactions', {
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    page: { type: 'integer', minimum: 1 },
                    limit: { type: 'integer', minimum: 1 }
                }
            }
        }
    }, getAllTransactions);
    fastify.get('/transactions/:id', {}, getTransactionById);
    fastify.put('/transactions/:id', {}, updateTransactionById);
    fastify.delete('/transactions/:id', {}, deleteTransactionById);
    done();
};
