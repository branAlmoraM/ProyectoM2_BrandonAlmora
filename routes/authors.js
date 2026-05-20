const express = require("express");
const router = express.Router();

// Importamos el archivo que contiene los controladores de autores
const authorsController = require("../controllers/authorsController");

// GET /blog/authors - Obtener todos los autores
router.get("/", authorsController.getAllAuthors);
// GET /blog/authors/:id - Obtener un autor por ID
router.get("/:id", authorsController.getAuthorId);

module.exports = router;
