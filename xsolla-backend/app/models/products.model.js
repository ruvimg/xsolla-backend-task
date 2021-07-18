module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        SKU: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        cost: {
            type: Sequelize.STRING
        }
    });

    return Product;
};