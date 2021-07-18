module.exports = app => {
    const products = require("../controllers/products.controller.js");

    var router = require("express").Router();

    // Создать товар
    router.post("/", products.create);

    // найти товары
    router.get("/", products.findAll);

    // Найти товар
    router.get("/:id", products.findOne);

    // Обновить товар
    router.put("/:id", products.update);

    // Удалить товар
    router.delete("/:id", products.delete);

    // Удалить все товары
    router.delete("/", products.deleteAll);

    app.use('/api/products', router);
};