module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categories", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        color: {
            type: Sequelize.STRING,
            allowNull: true
        },
        icon: {
            type: Sequelize.STRING,
            allowNull: true
        },
    },
    {
        paranoid: true,
        timestamps: true
    });
    return Category;
};