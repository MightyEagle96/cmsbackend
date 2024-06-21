import express from "express";

import {
  sendMailPro,
  sendMailToSupervisors,
  sendMailVersion2,
} from "../controllers/mailController.js";
const mailRouter = express.Router();

//center
mailRouter
  .post("/send", sendMailPro)
  .post("/sendmail", sendMailVersion2)
  .post("/sendmailtosupervisors", sendMailToSupervisors);

export default mailRouter;
