// Validaciones para authors
const validateAuthor = (req, res, next) => {
  const { name, email } = req.body;

  // Validar nombre
  if (!name || name.trim() === "") {
    return res.status(400).json({
      error: "El nombre es obligatorio",
    });
  }

  // Validar email
  if (!email || email.trim() === "") {
    return res.status(400).json({
      error: "El email es obligatorio",
    });
  }

  next();
};

// Validaciones para posts
const validatePost = (req, res, next) => {
  const { title, content, author_id } = req.body;

  // Validar título
  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "El título es obligatorio",
    });
  }

  // Validar contenido
  if (!content || content.trim() === "") {
    return res.status(400).json({
      error: "El contenido es obligatorio",
    });
  }

  // Validar author_id
  if (!author_id) {
    return res.status(400).json({
      error: "El author_id es obligatorio",
    });
  }

  next();
};

module.exports = {
  validateAuthor,
  validatePost,
};
