// Aquí definimos la aplicación
const { loadEnvFile } = require("node:process");
loadEnvFile(".env");
const express = require("express");

const authorRoutes = require("./routes/authors");
const postsRoutes = require("./routes/posts");
const notFound = require("./middlewares/notFound");
const erroHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/blog/authors", authorRoutes);
app.use("/blog/posts", postsRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    message: "Blog API",
    endpoints: {
      authors: "/blog/authors",
      posts: "/blog/posts",
    },
  });
});

// Middleware para manejar rutas no encontradas
app.use(notFound);
// Manejo de errores de PostgreSQL
app.use(erroHandler.errorPostgre);
// Manejo de errores del servidor
app.use(erroHandler.manejoErrores);

module.exports = app;
