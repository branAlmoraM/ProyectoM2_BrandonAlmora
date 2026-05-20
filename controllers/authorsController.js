const pool = require("../db/config");

// GET /api/authors - Obtener todos los autores
const getAllAuthors = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM authors ORDER BY name");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error obteniendo autores:", error);
    res.status(500).json({ error: "Error obteniendo autores" });
  }
};

module.exports = { getAllAuthors };
