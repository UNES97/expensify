const db = require("../models");
const Transaction = db.transaction;
const { statusCodes } = require("../utils");

const createTransaction = async (req, reply) => {
    try {
        const { amount, description, date, type } = req.body;
        
        const transaction = await Transaction.create({
            amount,
            description,
            date,
            type
        });

        reply.status(statusCodes.CREATED).send({
            message: "Transaction created successfully",
            transaction,
            statusCode: statusCodes.CREATED
        });
    } catch (err) {
        reply.status(statusCodes.CUSTOM_ERROR).send({ 
            message: err.message,
            statusCode: statusCodes.CUSTOM_ERROR,
        });
    }
};

const getAllTransactions = async (req, reply) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;

        const offset = (page - 1) * limit;

        const { count, rows } = await Transaction.findAndCountAll({
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        });

        reply.status(statusCodes.SUCCESS).send({
            transactions: rows,
            totalCount: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            statusCode: statusCodes.SUCCESS
        });
    } catch (err) {
        reply.status(statusCodes.CUSTOM_ERROR).send({ 
            message: err.message,
            statusCode: statusCodes.CUSTOM_ERROR,
        });
    }
};

const getTransactionById = async (req, reply) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);

        if (!transaction) {
            return reply.status(statusCodes.NOT_FOUND).send({
                message: "Transaction not found",
                statusCode: statusCodes.NOT_FOUND
            });
        }

        reply.status(statusCodes.SUCCESS).send({
            transaction,
            statusCode: statusCodes.SUCCESS
        });
    } catch (err) {
        reply.status(statusCodes.CUSTOM_ERROR).send({ 
            message: err.message,
            statusCode: statusCodes.CUSTOM_ERROR,
        });
    }
};

const updateTransactionById = async (req, reply) => {
    try {
        const { amount, description, date, type } = req.body;
        
        const transaction = await Transaction.findByPk(req.params.id);

        if (!transaction) {
            return reply.status(statusCodes.NOT_FOUND).send({
                message: "Transaction not found",
                statusCode: statusCodes.NOT_FOUND
            });
        }

        await transaction.update({
            amount,
            description,
            date,
            type
        });

        reply.status(statusCodes.SUCCESS).send({
            message: "Transaction updated successfully",
            transaction,
            statusCode: statusCodes.SUCCESS
        });
    } catch (err) {
        reply.status(statusCodes.CUSTOM_ERROR).send({ 
            message: err.message,
            statusCode: statusCodes.CUSTOM_ERROR,
        });
    }
};

const deleteTransactionById = async (req, reply) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);

        if (!transaction) {
            return reply.status(statusCodes.NOT_FOUND).send({
                message: "Transaction not found",
                statusCode: statusCodes.NOT_FOUND
            });
        }

        await transaction.destroy();

        reply.status(statusCodes.SUCCESS).send({
            message: "Transaction deleted successfully",
            statusCode: statusCodes.SUCCESS
        });
    } catch (err) {
        reply.status(statusCodes.CUSTOM_ERROR).send({ 
            message: err.message,
            statusCode: statusCodes.CUSTOM_ERROR,
        });
    }
};

module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransactionById,
    deleteTransactionById
};
