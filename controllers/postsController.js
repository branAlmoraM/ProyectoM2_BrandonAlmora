const pool = require("../db/config");

// GET /blog/posts - Obtener todos los posts
const getAllPosts = async (req, res) => {
  const { published } = req.query;

  try {
    let query = "SELECT * FROM posts";
    let params = [];

    if (published !== undefined) {
      query += " WHERE published = $1";
      params.push(published === "true");
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo posts:", error);
    res.status(500).json({ error: "Error obteniendo posts" });
  }
};

// GET /blog/posts/:id - Obtener un post por ID
const getPostsId = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error obteniendo post:", error);
    res.status(500).json({ error: "Error obteniendo post" });
  }
};

// GET /blog/posts/author/:authorId - Obtener posts con detalle de su author
const getPostsByAuthor = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        posts.id,
        posts.title,
        posts.content,
        posts.published,
        posts.created_at,
        authors.id AS author_id,
        authors.name AS author_name,
        authors.email AS author_email,
        authors.bio AS author_bio
      FROM posts
      INNER JOIN authors
      ON posts.author_id = authors.id
      WHERE authors.id = $1
      ORDER BY posts.created_at DESC`,
      [req.params.authorId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "No se encontraron posts para este autor",
      });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error obteniendo posts del autor:", error);
    res.status(500).json({
      error: "Error obteniendo posts del autor",
    });
  }
};

// POST /blog/posts - Crear un nuevo post
const postNewPost = async (req, res) => {
  const { author_id, title, content, published } = req.body;

  if (!title || !content || !author_id) {
    return res.status(400).json({
      error: "Título, contenido y author_id son requeridos",
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO posts (author_id, title, content, published) VALUES ($1, $2, $3, $4) RETURNING *",
      [author_id, title, content, published || false],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creando post:", error);

    if (error.code === "23503") {
      return res.status(404).json({ error: "El autor especificado no existe" });
    }

    res.status(500).json({ error: "Error creando post" });
  }
};

// PUT /blog/posts/:id - Actualizar un post
const putPosts = async (req, res) => {
  const { title, content, published } = req.body;

  try {
    const result = await pool.query(
      "UPDATE posts SET title = COALESCE($1, title), content = COALESCE($2, content), published = COALESCE($3, published) WHERE id = $4 RETURNING *",
      [title, content, published, req.params.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error actualizando post:", error);
    res.status(500).json({ error: "Error actualizando post" });
  }
};

// DELETE /blog/posts/:id - Eliminar un post
const deletePosts = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM posts WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json({ message: "Post eliminado exitosamente" });
  } catch (error) {
    console.error("Error eliminando post:", error);
    res.status(500).json({ error: "Error eliminando post" });
  }
};

module.exports = {
  getAllPosts,
  getPostsId,
  postNewPost,
  putPosts,
  deletePosts,
  getPostsByAuthor,
};
