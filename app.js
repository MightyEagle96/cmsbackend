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
  .use(cors())
  .use(express.json({ limit: "50mb" }))

  .use(morgan("dev"))

  .use(router)

  .listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
