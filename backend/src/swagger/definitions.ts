export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Habit Challenge API",
    version: "1.0.0",
    description: "API documentation for Habit Challenge project",
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Development server",
    },
  ],
}; 