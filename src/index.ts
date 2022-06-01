import express from "express";

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';


import { usersRoutes } from "./routes/users.routes";


const app = express();


app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJS - SOLID principles',
      description: 'Practicing SOLID principle in a NodeJS project',
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:3333",
        description: "SOLID principles Documentation",
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};
const openapiSpecification =  swaggerJsdoc(options);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use("/users", usersRoutes);

export { app };
