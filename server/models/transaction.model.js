module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transactions", {
        amount: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM('expense', 'income'),
            allowNull: false
        }
    },
    {
        paranoid: true,
        timestamps: true
    });
    return Transaction;
};