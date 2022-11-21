const request = require("supertest")
const app =  require("../app");

describe('app', () => {

    describe("Initialization", () => {

        it("should return a app object", () => {
            expect(app).toBeDefined();
        });
    });

    describe("GET /notes", () => {
        it("should return a 200 OK", () => {
            return request(app).get("/notes").then(res => {
                expect(res.status).toBe(200);
            });
        });
    });

    describe("GET /", () => {
        it("should return a 200 OK", () => {
            return request(app).get("/").then(res => {
                expect(res.status).toBe(200);
            });
        });
    });

    describe("GET /api/notes", () => {
        it("should return a 200 OK", () => {
            return request(app).get("/api/notes").then(res => {
                expect(res.status).toBe(200);
            });
        });
    });

    describe("POST /api/notes", () => {
        it("should return a 200 OK", () => {
            note = {
                title: "Test Title",
                text: "Test Text"
            }
            return request(app).post("/api/notes").send(note).then(res => {
                expect(res.status).toBe(200);
            });
        });
    });

    describe("DELETE /api/notes/:id", () => {
        it("should return a 200 OK", () => {
            return request(app).delete("/api/notes/:id").then(res => {
                expect(res.status).toBe(200);
            });
        });
    });


});

