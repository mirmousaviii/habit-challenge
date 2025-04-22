import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerDefinition } from "./definitions";
import { securitySchemes } from "./security";
import { schemas } from "./schemas";
import { paths } from "./paths";

const options: swaggerJSDoc.Options = {
  definition: {
    ...swaggerDefinition,
    components: {
      securitySchemes,
      schemas,
    },
    paths,
  },
  apis: ["./src/modules/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerUiOptions = {
  explorer: true,
};

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
};
