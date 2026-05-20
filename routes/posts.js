const express = require("express");
const router = express.Router();

// Importamos el controlador de los posts
const postsController = require("../controllers/postsController");

// GET /blog/posts - Obtener todos los posts
router.get("/", postsController.getAllPosts);

module.exports = router;
