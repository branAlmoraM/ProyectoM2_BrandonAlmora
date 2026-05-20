// Aquí definimos la aplicación
const express = require("express");

const authorRoutes = require("./routes/authors");
const postsRoutes = require("./routes/posts");

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta raíz
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

app.use("/blog/authors", authorRoutes);
app.use("/blog/posts", postsRoutes);

module.exports = app;
