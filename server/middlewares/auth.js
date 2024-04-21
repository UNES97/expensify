const jwt = require("jsonwebtoken");
require('dotenv').config()
const { statusCodes } = require("../utils");

const verifyToken = (req, reply, next) => {
    try {
        let token = req.headers["x-access-token"];
        if (!token) {
            reply.status(statusCodes.AUTH_ERROR).send({
                statusCode: statusCodes.AUTH_ERROR,
                message: "No TOKEN supplied"
            });
        }
        else {
            jwt.verify(token, process.env.SECRECT_KEY, (err, decoded) => {
                if (err) {
                    reply.status(statusCodes.AUTH_ERROR).send({
                        statusCode: statusCodes.AUTH_ERROR,
                        message: "Invalid TOKEN"
                    });
                }
                req.userId = decoded.id;
                next();
            });
        }
    } catch (error) {
        reply.status(statusCodes.CUSTOM_ERROR);
        return reply.send({
            message: error.message,
            statusCode: statusCodes.CUSTOM_ERROR,
        });
    }
}

module.exports = {
    verifyToken,
}