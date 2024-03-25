import express from "express";
import {
  centreList,
  createBulkCentres,
  createCentre,
  loginCentre,
  viewCentre,
} from "../controllers/centreController.js";
import { createAccount, loginAccount } from "../controllers/adminController.js";
import { outgoneMails, sendMail } from "../controllers/mailController.js";
import centreRouter from "./centreRouter.js";

const router = express.Router();

const accountRootPath = (path) => `/cms/account/${path}`;
const mailPath = (path) => `/cms/mail/${path}`;

router

  .use("/cms/centre", centreRouter)

  .post(accountRootPath("create"), createAccount)
  .post(accountRootPath("login"), loginAccount)

  //mail router
  .post(mailPath("sendmail"), sendMail)
  .get(mailPath("outgoingmails"), outgoneMails)

  .use("*", (req, res) => res.status(404).send("Route not found"));

export default router;
