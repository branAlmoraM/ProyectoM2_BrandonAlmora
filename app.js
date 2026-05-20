// Aquí definimos la aplicación
const { loadEnvFile } = require("node:process");
loadEnvFile(".env");
const express = require("express");

const authorRoutes = require("./routes/authors");
const postsRoutes = require("./routes/posts");

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

module.exports = app;
