const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();
const { statusCodes } = require("../utils");

const signin = async(req, reply) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            },
        });

        if (!user) {
            return reply.status(statusCodes.NOT_FOUND).send({
                message: "Invalid username or password",
                statusCode: statusCodes.NOT_FOUND,
            });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return reply.status(statusCodes.AUTH_ERROR).send({
                accessToken: null,
                message: "Invalid password or password",
                statusCode: statusCodes.AUTH_ERROR,
            });
        }

        if (!user.status) {
            return reply.status(statusCodes.AUTH_ERROR).send({
                accessToken: null,
                message: "The account is not active",
                statusCode: statusCodes.AUTH_ERROR,
            });
        }

        const tokenLifetime = parseInt(process.env.TOKEN_LIFETIME);
        const currentTime = new Date();
        const expirationTime = new Date(currentTime.getTime() + tokenLifetime * 1000);
        const token = jwt.sign(
            { 
                id: user.id, 
                fullname: user.fullname,
                username: user.username,
            },
            process.env.SECRECT_KEY,
            {
                expiresIn: tokenLifetime
            }
        );

        reply.status(statusCodes.SUCCESS).send({
            accessToken: token,
            statusCode: statusCodes.SUCCESS,
            expiresIn: expirationTime
        });
    } catch (err) {
        reply.status(statusCodes.CUSTOM_ERROR).send({ 
            message: err.message,
            statusCode: statusCodes.CUSTOM_ERROR,
        });
    }
}

const signup = async (req, reply) => {
    try {
        const { username, password, email, fullname, lastname } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        await User.create({
            username,
            password: hashedPassword,
            email,
            fullname,
            lastname,
            status: true
        });

        reply.status(statusCodes.CREATED).send({
            message: "User registered successfully",
            statusCode: statusCodes.CREATED,
        });
    } catch (err) {
        reply.status(statusCodes.CUSTOM_ERROR).send({ 
            message: err.message,
            statusCode: statusCodes.CUSTOM_ERROR,
        });
    }
};


module.exports = {
    signin,
    signup
}