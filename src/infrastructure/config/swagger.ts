import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MentorHub API",
      version: "1.0.0",
      description: "MentorHub Backend API Documentation",
    },

    servers: [
      {
        url: "http://localhost:8000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/presentation/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
