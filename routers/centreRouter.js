import express from "express";
import {
  centreList,
  centreSuggestions,
  createBulkCentres,
  createCentre,
  loginCentre,
  viewCentre,
} from "../controllers/centreController.js";
const centreRouter = express.Router();

//center
centreRouter
  .post("/create", createCentre)
  .post("/login", loginCentre)
  .get("/all", centreList)
  .post("/createbulk", createBulkCentres)
  .post("/suggestions", centreSuggestions)
  .get("/view/:id", viewCentre);

export default centreRouter;
