const request = require("supertest");
const app = require("../app");
const pool = require("../db/config");

describe("Posts endpoints", () => {
  it("GET /blog/posts debe devolver una lista de posts", async () => {
    const res = await request(app).get("/blog/posts");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /blog/posts debe fallar si falta title", async () => {
    const res = await request(app).post("/blog/posts").send({
      author_id: 1,
      content: "Contenido de prueba",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("POST /blog/posts debe fallar si falta content", async () => {
    const res = await request(app).post("/blog/posts").send({
      author_id: 1,
      title: "Título de prueba",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("POST /blog/posts debe fallar si falta author_id", async () => {
    const res = await request(app).post("/blog/posts").send({
      title: "Título de prueba",
      content: "Contenido de prueba",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  afterAll(async () => {
    await pool.end();
  });
});
