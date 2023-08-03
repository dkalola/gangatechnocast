const request = require("supertest");
const { app, server } = require("../app");

// Close the server after all the tests have finished
afterAll((done) => {
  server.close(done);
});

// Define a sample service for testing
const sampleService = {
  id: "1",
  name: "Sample Service",
  description: "This is a sample service",
};




describe("Test routes", () => {
  test("GET / should return status code 200 and render the home page", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("<title>Ganga Technocast - Home</title>");
  });

  test("GET /about should return status code 200 and render the about page", async () => {
    const response = await request(app).get("/about");
    expect(response.status).toBe(200);
    expect(response.text).toContain("<title>Ganga Technocast - About</title>");
  });

  test("GET /wws should return status code 200 and render the services page", async () => {
    const response = await request(app).get("/wws");
    expect(response.status).toBe(200);
    expect(response.text).toContain(
      "<title>Ganga Technocast - Services</title>"
    ); // Assuming your "services" page has this title
  });

  test("GET /service-d should return status code 200 and render the service details page for a valid service ID", async () => {
    const response = await request(app)
      .get("/service-d")
      .query({ service: "1" }); // Use the ID of the sample service
    expect(response.status).toBe(200);
    expect(response.text).toContain(
      "<title>Ganga Technocast - Services</title>"
    ); // Assuming your "service-details" page has this title
  });

  test("GET /projects should return status code 200 and render the projects page with correct data", async () => {
    const response = await request(app).get("/projects");
    expect(response.status).toBe(200);
    expect(response.text).toContain(
      "<title>Ganga Technocast - Projects</title>"
    );
    // Add more assertions for other data you're expecting in the rendered HTML
  });

  // Rate limit testing

  test("Rate limiting for / should return status code 429 after 10 requests within 1 minute", async () => {
    for (let i = 0; i < 10; i++) {
      await request(app).get("/");
    }
    const response = await request(app).get("/");
    expect(response.status).toBe(429);
  });

  test("Rate limiting for /about should return status code 429 after 10 requests within 1 minute", async () => {
    for (let i = 0; i < 10; i++) {
      await request(app).get("/about");
    }
    const response = await request(app).get("/about");
    expect(response.status).toBe(429);
  });

  test("Rate limiting for / should return status code 429 after 10 requests within 1 minute", async () => {
    for (let i = 0; i < 10; i++) {
      await request(app).get("/wws");
    }
    const response = await request(app).get("/");
    expect(response.status).toBe(429);
  });

  test("Rate limiting for /about should return status code 429 after 10 requests within 1 minute", async () => {
    for (let i = 0; i < 10; i++) {
      await request(app).get("/service-d");
    }
    const response = await request(app).get("/about");
    expect(response.status).toBe(429);
  });
});
