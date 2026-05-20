const pool = require("../db/config");

// GET /blog/authors - Obtener todos los autores
const getAllAuthors = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM authors ORDER BY name");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error obteniendo autores:", error);
    res.status(500).json({ error: "Error obteniendo autores" });
  }
};

// GET /blog/authors/:id - Obtener un autor por ID
const getAuthorId = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM authors WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error obteniendo autor:", error);
    res.status(500).json({ error: "Error obteniendo autor" });
  }
};

module.exports = { getAllAuthors, getAuthorId };
