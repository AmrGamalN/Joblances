import bodyParser from "body-parser";
import express, { Application, NextFunction, Response, Request } from "express";
import { swaggerDoc } from "./src/config/swaggerConfig";
import connectToMongoDB from "./src/config/mongooseConfig";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
const xssClean = require("xss-clean");
import { CorsOptions } from "cors";
import router from "./src/router";
import { redisClient } from "./src/config/redisConfig";
import { ApolloServer } from "apollo-server-express";
import expressPlayground from "graphql-playground-middleware-express";
import { schema } from "./src/graphql/schema";
import { errorMiddleware } from "./src/middlewares/handleError.middleware";
const app: Application = express();

const corsOption: CorsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(xssClean());

swaggerDoc(app);
app.use("/api/v1", router);
const startApolloServer = async () => {
  const server = new ApolloServer({
    schema,
    context: async ({
      req,
      res,
    }: {
      req: Request;
      res: Response;
    }) => {
      return { req, res, next: (req as any).contextNext };
    },
    formatError: (err) => ({
      message: err.message,
      status: err.extensions?.code || 500,
      success: false,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      path: err.path,
      name: err.name,
    }),
    introspection: true,
  });
  await server.start();
  server.applyMiddleware({
    app: app as any,
    path: "/graphql",
    cors: corsOption,
  });
};

const PORT = process.env.PORT || 8080;
Promise.all([connectToMongoDB(), redisClient.connect()])
  .then(async () => {
    await startApolloServer();
    app.get(
      "/playground",
      expressPlayground({
        endpoint: "/graphql",
      })
    );
    app.use("*", (req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ message: "Page not found" });
    });
    app.use(errorMiddleware);
    app.listen(PORT, () => {
      console.log(
        `
        Server is running on port ${PORT}
        Apollo server is running on: http://localhost:${PORT}/graphql
        Playground is running on: http://localhost:${PORT}/playground
        Swagger is running on: http://localhost:${PORT}/api-docs
        `
      );
    });
  })
  .catch((error) => {
    console.error("Error while connecting to MongoDB or Redis:", error);
  });
