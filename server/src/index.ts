import express, { Request, Response } from "express";
import appRouter from "./routes/index";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config()

require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Authorisation'],
  credentials: true
}));
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Task Scheduler",
      version: "1.0.0",
      description: "Manage your tasks efficiently.",
    },
    persistAuthorization: true,
    defaultModelsExpandDepth: -1,
    docExpansion: 'none',
    initOAuth: {
      useBasicAuthenticationWithAccessCodeGrant: false
    }
  },
  apis: ["./src/routes/*.ts"],
};


app.use("/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));
app.use("/v1/api", appRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
