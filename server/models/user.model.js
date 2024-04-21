module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        lastname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fullname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args:true,
                msg: 'Username already used'
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                notEmpty:{
                    args:true,
                    msg:"Email required"
                },
                isEmail:{
                    args:true,
                    msg:'Valid email required'
                }
            },
            unique: {
                args:true,
                msg: 'E-mail address already in use'
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        paranoid: true,
        timestamps: true
    });
    return User;
};