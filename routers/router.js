import express from "express";
import { createCentre } from "../controllers/centreController.js";

const router = express.Router();

const centreRootPath = (path) => `/cms/centre/${path}`;

router
  .post(centreRootPath("create"), createCentre)
  .use("*", (req, res) => res.status(404).send("Route not found"));

export default router;
