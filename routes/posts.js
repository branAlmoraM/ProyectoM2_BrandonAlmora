const express = require("express");
const router = express.Router();

// Importamos el controlador de los posts
const postsController = require("../controllers/postsController");

// GET /blog/posts - Obtener todos los posts
router.get("/", postsController.getAllPosts);
// GET /blog/posts/:id - Obtener un post por ID
router.get("/:id", postsController.getPostsId);
// POST /blog/posts - Crear un nuevo post
router.post("/", postsController.postNewPost);
// // PUT /blog/posts/:id - Actualizar un post
// router.put("/:id", postsController.putPosts);
// // DELETE /blog/posts/:id - Eliminar un post
// router.delete("/:id", postsController.deletePosts);

module.exports = router;
