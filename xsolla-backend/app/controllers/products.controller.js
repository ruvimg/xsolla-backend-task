const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

// Создаем новый товар
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Наименование не может быть пустым"
        });
        return;
    }

    // Создаем товар
    const product = {
        SKU: req.body.SKU,
        name: req.body.name,
        type: req.body.type,
        cost: req.body.cost
    };

    // Сохраняеи товар в БД
    Product.create(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ошибка при сохранении товара"
            });
        });
};


exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Product.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ошибка при поиске товаров"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Ошибка выбора товара id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Product.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                        message: "Товар был обновлен"
                });
            } else {
                res.send({
                    message: `Ошибка обновления товара id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ошибка обновления товара id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Product.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Товар удален!"
                });
            } else {
                res.send({
                    message: `Ошибка удаления товара id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ошибка удаления товара id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Product.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} товаров удалено` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ошибка удаления товаров."
            });
        });
};