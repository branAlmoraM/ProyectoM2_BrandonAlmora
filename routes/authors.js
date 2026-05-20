const express = require("express");
const router = express.Router();

// Importamos el archivo que contiene los controladores de autores
const authorsController = require("../controllers/authorsController");

// GET /api/authors - Obtener todos los autores
router.get("/", authorsController.getAllAuthors);

module.exports = router;
