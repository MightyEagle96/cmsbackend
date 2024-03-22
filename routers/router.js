import express from "express";
import {
  centreList,
  createCentre,
  loginCentre,
} from "../controllers/centreController.js";
import { createAccount, loginAccount } from "../controllers/adminController.js";

const router = express.Router();

const centreRootPath = (path) => `/cms/centre/${path}`;
const accountRootPath = (path) => `/cms/account/${path}`;

router

  //center
  .post(centreRootPath("create"), createCentre)
  .post(centreRootPath("login"), loginCentre)
  .get(centreRootPath("all"), centreList)

  //account
  .post(accountRootPath("create"), createAccount)
  .post(accountRootPath("login"), loginAccount)

  .use("*", (req, res) => res.status(404).send("Route not found"));

export default router;
