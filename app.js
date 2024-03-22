import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDatabase } from "./database.js";
import router from "./routers/router.js";
import morgan from "morgan";
const app = express();

dotenv.config();

const port = process.env.PORT;

ConnectDatabase();
app

  .use(express.json({ limit: "50mb" }))

  .use(morgan("dev"))
  .use(cors())

  .use(router)

  .listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
