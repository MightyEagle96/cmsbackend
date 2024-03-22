import express from "express";
import { createCentre, loginCentre } from "../controllers/centreController.js";

const router = express.Router();

const centreRootPath = (path) => `/cms/centre/${path}`;

router
  .post(centreRootPath("create"), createCentre)
  .post(centreRootPath("login"), loginCentre)
  .use("*", (req, res) => res.status(404).send("Route not found"));

export default router;
