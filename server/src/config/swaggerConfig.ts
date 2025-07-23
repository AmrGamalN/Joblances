import { Application, NextFunction, Response, Request } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const swaggerOptions = (route: string): object => {
  return {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "JobLaneces",
        version: "1.0.0",
        description: `API documentation for the ${route}`,
      },
      servers: [
        {
          url: "https://joblaneces-platform.onrender.com/api/v1",
          description: "Local server for development",
        },
      ],
    },
    apis: [
      `./src/routes/${route}/*.ts`,
      `./src/swaggers/components/${route}.ts`,
      `./src/swaggers/tags/${route}.ts`,
      `./src/swaggers/responses/${route}.ts`,
      `./src/swaggers/responses/baseResponse.ts`,
      `./src/swaggers/parameters/*.ts`,
    ],
  };
};

export const swaggerDoc = (app: Application) => {
  app.use("/api-docs/:routeName", swaggerUi.serve);
  app.use(
    "/api-docs/:routeName",
    (req: Request, res: Response, next: NextFunction) => {
      const routeName = req.params.routeName as string;
      const swaggerSpecs = swaggerJSDoc(swaggerOptions(routeName));
      return swaggerUi.setup(swaggerSpecs, { explorer: true })(req, res, next);
    }
  );
};
