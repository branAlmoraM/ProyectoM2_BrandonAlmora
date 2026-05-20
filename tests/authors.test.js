const request = require("supertest");
const app = require("../app");
const pool = require("../db/config");

describe("Authors endpoints", () => {
  it("GET /blog/authors debe devolver una lista de autores", async () => {
    const res = await request(app).get("/blog/authors");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /blog/authors debe crear un autor", async () => {
    const res = await request(app)
      .post("/blog/authors")
      .send({
        name: "Autor Test",
        email: `autor${Date.now()}@test.com`,
        bio: "Autor creado desde test",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Autor Test");
  });

  it("POST /blog/authors debe fallar si name está vacío", async () => {
    const res = await request(app)
      .post("/blog/authors")
      .send({
        name: "",
        email: `sinname${Date.now()}@test.com`,
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  afterAll(async () => {
    await pool.end();
  });
});
