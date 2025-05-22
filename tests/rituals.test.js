// Tests d'API pour les rituels (Jest + Supertest)
const request = require("supertest");
const app = require("../app");

describe("API /api/rituals", () => {
  it("GET /api/rituals doit retourner 200 et un tableau", async () => {
    const res = await request(app).get("/api/rituals");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
