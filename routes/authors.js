const express = require("express");
const router = express.Router();

// Importamos el archivo que contiene los controladores de autores
const authorsController = require("../controllers/authorsController");

const { validateAuthor } = require("../middlewares/validations");

// GET /blog/authors - Obtener todos los autores
router.get("/", authorsController.getAllAuthors);
// GET /blog/authors/:id - Obtener un autor por ID
router.get("/:id", authorsController.getAuthorId);
// POST /blog/authors - Crear un nuevo autor
router.post("/", validateAuthor, authorsController.postAuthor);
// PUT /blog/authors/:id - Actualizar información de un autor
router.put("/:id", authorsController.putAuthorId);
// DELETE /blog/authors/:id - Eliminar un autor
router.delete("/:id", authorsController.deleteAuthor);

module.exports = router;
